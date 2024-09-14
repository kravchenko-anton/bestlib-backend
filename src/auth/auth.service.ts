import type { EnvConfig } from '@/src/utils/config/env-config';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, type User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { OAuth2Client } from 'google-auth-library';
import { ReturnGenreObject } from '../genre/return.genre.object';
import { UserService } from '../user/user.service';
import { serverError } from '../utils/helpers/server-error';
import { PrismaService } from '../utils/services/prisma.service';
import type { AuthDto, GoogleAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
	private google: OAuth2Client;

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly usersService: UserService,
		private readonly configService: ConfigService<EnvConfig>
	) {
		this.google = new OAuth2Client(
			configService.get('GOOGLE_CLIENT_ID'),
			configService.get('GOOGLE_CLIENT_SECRET')
		);
	}

	async login(dto: AuthDto) {
		console.log('Start login', dto.email);
		const user = await this.validateUser(dto);
		console.log('User validated', user);
		const tokens = this.issueToken(user.id);
		console.log('Tokens issued', tokens);
		return {
			user: this.userFields(user),
			...tokens
		};
	}

	async register(dto: AuthDto) {
		console.log('Start register', dto.email);
		await this.checkEmailExist(dto.email);
		console.log('Email checked, user with this email not exist');
		const popularGenres = await this.getPopular();
		console.log('Popular genres fetched');
		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				authType: 'email',
				password: await hash(dto.password),
				goalMinutes: 10,
				selectedGenres: {
					connect: popularGenres.map(genre => ({
						id: genre.id
					}))
				}
			}
		});

		console.log('User created successfully', user);

		const tokens = this.issueToken(user.id);
		return {
			user: this.userFields(user),
			...tokens
		};
	}

	async googleSign(dto: GoogleAuthDto) {
		console.log('Start google sign in');
		const ticket = await this.google
			.verifyIdToken({
				idToken: dto.socialId,
				audience: [this.configService.getOrThrow('GOOGLE_CLIENT_ID')]
			})
			.catch(() => {
				throw serverError(HttpStatus.BAD_REQUEST, 'Invalid google token');
			});
		console.log('Google token verified', dto.socialId);
		const data = ticket.getPayload();
		console.log('Google token payload', data);
		if (!data?.sub)
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid google token');

		const user = await this.prisma.user.findUnique({
			where: {
				socialId: data?.sub
			}
		});
		if (user) {
			console.log('User exist and i just logged in');
			const tokens = this.issueToken(user.id);

			return {
				type: 'login',
				user: this.userFields(user),
				...tokens
			};
		}

		console.log('User not exist, i will register');

		if (!data?.email)
			throw serverError(
				HttpStatus.BAD_REQUEST,
				'There is not enough information to process'
			);
		console.log('Email exist, i will check it');
		await this.checkEmailExist(data.email);
		console.log('Email checked, user with this email not exist');
		const popularGenres = await this.getPopular();
		console.log('Popular genres fetched');
		const newUser = await this.prisma.user.create({
			data: {
				email: data.email,
				socialId: data.sub,
				goalMinutes: 10,
				selectedGenres: {
					connect: popularGenres.map(genre => ({
						id: genre.id
					}))
				},
				role: Role.user,
				fullName:
					data.given_name && data.family_name
						? `${data.given_name} ${data.family_name}`
						: data?.email?.split('@')[0],
				picture: data.picture || 'fallback.png',
				location: data.locale || 'unknown'
			}
		});
		console.log('User created successfully', newUser);

		const newTokens = this.issueToken(newUser.id);
		return {
			type: 'register',
			user: this.userFields(newUser),
			...newTokens
		};
	}

	async refresh(refreshToken: string) {
		const result: { id: string } = await this.jwt
			.verifyAsync(refreshToken)
			.catch(error => {
				throw serverError(HttpStatus.BAD_REQUEST, error.message);
			});
		if (!result)
			throw serverError(HttpStatus.BAD_REQUEST, "Can't refresh token");
		const user = await this.usersService.getUserById(result.id, {
			email: true,
			id: true
		});

		const tokens = this.issueToken(user.id);
		return {
			user,
			...tokens
		};
	}

	issueToken(userId: string) {
		const data = { id: userId };
		return {
			accessToken: this.jwt.sign(data, {
				expiresIn:
					this.configService.get('NODE_ENV') === 'development' ? '10s' : '15m'
			}),
			refreshToken: this.jwt.sign(data, {
				expiresIn: '10d'
			})
		};
	}
	async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			},
			select: {
				password: true,
				id: true,
				role: true,
				email: true
			}
		});
		console.log(user);
		if (!user?.password)
			throw serverError(HttpStatus.BAD_REQUEST, 'Incorrect email or password');
		const isPasswordValid = await verify(user.password, dto.password);
		if (!isPasswordValid)
			throw serverError(HttpStatus.BAD_REQUEST, 'Incorrect email or password');

		return user;
	}

	async getPopular() {
		return this.prisma.genre.findMany({
			take: 3,
			select: ReturnGenreObject
		});
	}

	async checkEmailExist(email: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email
			}
		});
		if (user)
			throw serverError(
				HttpStatus.BAD_REQUEST,
				'User with this email already exist'
			);
	}

	userFields(user: Pick<User, 'id' | 'email' | 'role'>) {
		return {
			id: user.id,
			email: user.email,
			role: user.role
		};
	}
}
