import { ConfigService } from '@nestjs/config';
import type { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../utils/services/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate({ id }: Pick<User, 'id'>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        goalMinutes: number;
        socialId: string | null;
        password: string | null;
        authType: import(".prisma/client").$Enums.AuthType;
        picture: string;
        fullName: string;
        location: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
export {};
