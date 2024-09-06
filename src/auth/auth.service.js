"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const google_auth_library_1 = require("google-auth-library");
const return_genre_object_1 = require("../genre/return.genre.object");
const user_service_1 = require("../user/user.service");
const server_error_1 = require("../utils/helpers/server-error");
const prisma_service_1 = require("../utils/services/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt, usersService, configService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.usersService = usersService;
        this.configService = configService;
        this.google = new google_auth_library_1.OAuth2Client(configService.get('GOOGLE_CLIENT_ID'), configService.get('GOOGLE_CLIENT_SECRET'));
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        const tokens = this.issueToken(user.id);
        return {
            user: this.userFields(user),
            ...tokens
        };
    }
    async register(dto) {
        await this.checkEmailExist(dto.email);
        const popularGenres = await this.getPopular();
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                authType: 'email',
                password: await (0, argon2_1.hash)(dto.password),
                goalMinutes: 10,
                selectedGenres: {
                    connect: popularGenres.map(genre => ({
                        id: genre.id
                    }))
                }
            }
        });
        const tokens = this.issueToken(user.id);
        return {
            user: this.userFields(user),
            ...tokens
        };
    }
    async googleSign(dto) {
        const ticket = await this.google
            .verifyIdToken({
            idToken: dto.socialId,
            audience: [this.configService.getOrThrow('GOOGLE_CLIENT_ID')]
        })
            .catch(() => {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Invalid google token');
        });
        const data = ticket.getPayload();
        if (!data?.sub)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Invalid google token');
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
        if (!data?.email)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'There is not enough information to process');
        await this.checkEmailExist(data.email);
        const popularGenres = await this.getPopular();
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
                role: client_1.Role.user,
                fullName: data.given_name && data.family_name
                    ? `${data.given_name} ${data.family_name}`
                    : data?.email?.split('@')[0],
                picture: data.picture || 'fallback.png',
                location: data.locale || 'unknown'
            }
        });
        const newTokens = this.issueToken(newUser.id);
        return {
            type: 'register',
            user: this.userFields(newUser),
            ...newTokens
        };
    }
    async refresh(refreshToken) {
        const result = await this.jwt
            .verifyAsync(refreshToken)
            .catch(error => {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, error.message);
        });
        if (!result)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, "Can't refresh token");
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
    issueToken(userId) {
        const data = { id: userId };
        return {
            accessToken: this.jwt.sign(data, {
                expiresIn: this.configService.get('NODE_ENV') === 'development' ? '10s' : '15m'
            }),
            refreshToken: this.jwt.sign(data, {
                expiresIn: '10d'
            })
        };
    }
    async validateUser(dto) {
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
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Incorrect email or password');
        const isPasswordValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isPasswordValid)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Incorrect email or password');
        return user;
    }
    async getPopular() {
        return this.prisma.genre.findMany({
            take: 3,
            select: return_genre_object_1.ReturnGenreObject
        });
    }
    async checkEmailExist(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user)
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'User with this email already exist');
    }
    userFields(user) {
        return {
            id: user.id,
            email: user.email,
            role: user.role
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        user_service_1.UserService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map