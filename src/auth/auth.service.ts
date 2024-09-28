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
		console.log('AuthService.login called with dto:', dto);
		const user = await this.validateUser(dto);
		const tokens = this.issueToken(user.id);
		const response = {
			user: this.userFields(user),
			...tokens
		};
		console.log('AuthService.login response:', response);
		return response;
	}

	async register(dto: AuthDto) {
		console.log('AuthService.register called with dto:', dto);
		await this.checkEmailExist(dto.email);
		const popularGenres = await this.getPopular();
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

		const tokens = this.issueToken(user.id);
		const response = {
			user: this.userFields(user),
			...tokens
		};
		console.log('AuthService.register response:', response);
		return response;
	}

	async googleSign(dto: GoogleAuthDto) {
		console.log('AuthService.googleSign called with dto:', dto);
		const ticket = await this.google
			.verifyIdToken({
				idToken: dto.socialId,
				audience: [this.configService.getOrThrow('GOOGLE_CLIENT_ID')]
			})
			.catch(() => {
				throw serverError(HttpStatus.BAD_REQUEST, 'Invalid google token');
			});
		const data = ticket.getPayload();
		if (!data?.sub)
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid google token');

		const user = await this.prisma.user.findUnique({
			where: {
				socialId: data?.sub,
				authType: 'google'
			}
		});
		if (user) {
			const tokens = this.issueToken(user.id);
			const response = {
				type: 'login',
				user: this.userFields(user),
				...tokens
			};
			console.log('AuthService.googleSign login response:', response);
			return response;
		}

		if (!data?.email)
			throw serverError(
				HttpStatus.BAD_REQUEST,
				'There is not enough information to process'
			);
		await this.checkEmailExist(data.email);
		const popularGenres = await this.getPopular();
		const newUser = await this.prisma.user.create({
			data: {
				email: data.email,
				socialId: data.sub,
				authType: 'google',
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

		const newTokens = this.issueToken(newUser.id);
		const response = {
			type: 'register',
			user: this.userFields(newUser),
			...newTokens
		};
		console.log('AuthService.googleSign register response:', response);
		return response;
	}

	async refresh(refreshToken: string) {
		console.log('AuthService.refresh called with refreshToken:', refreshToken);
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
		const response = {
			user,
			...tokens
		};
		console.log('AuthService.refresh response:', response);
		return response;
	}

	issueToken(userId: string) {
		console.log('AuthService.issueToken called with userId:', userId);
		const data = { id: userId };
		const tokens = {
			accessToken: this.jwt.sign(data, {
				expiresIn: '15m'
			}),
			refreshToken: this.jwt.sign(data, {
				expiresIn: '10d'
			})
		};
		console.log('AuthService.issueToken tokens:', tokens);
		return tokens;
	}

	async validateUser(dto: AuthDto) {
		console.log('AuthService.validateUser called with dto:', dto);
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
				authType: 'email'
			},
			select: {
				password: true,
				id: true,
				role: true,
				email: true
			}
		});
		if (!user?.password)
			throw serverError(HttpStatus.BAD_REQUEST, 'Incorrect email or password');
		const isPasswordValid = await verify(user.password, dto.password);
		if (!isPasswordValid)
			throw serverError(HttpStatus.BAD_REQUEST, 'Incorrect email or password');

		console.log('AuthService.validateUser validated user:', user);
		return user;
	}

	async getPopular() {
		console.log('AuthService.getPopular called');
		const popularGenres = await this.prisma.genre.findMany({
			take: 3,
			select: ReturnGenreObject
		});
		console.log('AuthService.getPopular response:', popularGenres);
		return popularGenres;
	}

	async checkEmailExist(email: string) {
		console.log('AuthService.checkEmailExist called with email:', email);
		const user = await this.prisma.user.findUnique({
			where: {
				email
			}
		});
		if (user) {
			throw serverError(
				HttpStatus.BAD_REQUEST,
				'User with this email already exist'
			);
		}
	}

	userFields(user: Pick<User, 'id' | 'email' | 'role'>) {
		console.log('AuthService.userFields called with user:', user);
		const userFields = {
			id: user.id,
			email: user.email,
			role: user.role
		};
		console.log('AuthService.userFields response:', userFields);
		return userFields;
	}
}
