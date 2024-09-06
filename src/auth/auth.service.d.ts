import type { EnvConfig } from '@/src/utils/config/env-config';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { PrismaService } from '../utils/services/prisma.service';
import type { AuthDto, GoogleAuthDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly usersService;
    private readonly configService;
    private google;
    constructor(prisma: PrismaService, jwt: JwtService, usersService: UserService, configService: ConfigService<EnvConfig>);
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    register(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    googleSign(dto: GoogleAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        type: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            goalMinutes: number;
            socialId: string;
            password: string;
            authType: import(".prisma/client").$Enums.AuthType;
            picture: string;
            fullName: string;
            location: string;
            role: import(".prisma/client").$Enums.Role;
            selectedGenres: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                icon: string;
                emoji: string;
            }[];
            reactions: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                type: string;
                description: string | null;
                text: string;
                xpath: string;
                startOffset: number;
                endOffset: number;
                userId: string;
                bookId: string;
            }[];
            savedBooks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                slug: string;
                description: string;
                recommendable: boolean;
                picture: string;
                ebook: string;
                readingTime: number;
                chapters: number;
                pagesCount: number;
                rating: number;
                isPublic: boolean;
                mainGenreId: string;
                keyPoints: string;
                authorId: string;
                bookSeriesId: string | null;
            }[];
            finishedBooks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                slug: string;
                description: string;
                recommendable: boolean;
                picture: string;
                ebook: string;
                readingTime: number;
                chapters: number;
                pagesCount: number;
                rating: number;
                isPublic: boolean;
                mainGenreId: string;
                keyPoints: string;
                authorId: string;
                bookSeriesId: string | null;
            }[];
            readingBooks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                slug: string;
                description: string;
                recommendable: boolean;
                picture: string;
                ebook: string;
                readingTime: number;
                chapters: number;
                pagesCount: number;
                rating: number;
                isPublic: boolean;
                mainGenreId: string;
                keyPoints: string;
                authorId: string;
                bookSeriesId: string | null;
            }[];
            readingHistory: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                startDate: Date;
                endDate: Date;
                readingTimeMs: number;
                scrollPosition: number;
                startProgress: number;
                endProgress: number;
                progressDelta: number;
                bookId: string;
                userId: string;
            }[];
            _count: {
                selectedGenres: number;
                reactions: number;
                savedBooks: number;
                finishedBooks: number;
                readingBooks: number;
                readingHistory: number;
            };
        };
    }>;
    issueToken(userId: string): {
        accessToken: string;
        refreshToken: string;
    };
    validateUser(dto: AuthDto): Promise<{
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getPopular(): Promise<{
        id: string;
        name: string;
        icon: string;
        emoji: string;
    }[]>;
    checkEmailExist(email: string): Promise<void>;
    userFields(user: Pick<User, 'id' | 'email' | 'role'>): {
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    };
}
