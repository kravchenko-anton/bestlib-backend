import { z } from 'zod';
declare const AuthOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    type: z.ZodOptional<z.ZodString>;
    user: z.ZodObject<{
        email: z.ZodString;
        role: z.ZodNativeEnum<{
            user: "user";
            admin: "admin";
        }>;
    }, "strip", z.ZodTypeAny, {
        email?: string;
        role?: "user" | "admin";
    }, {
        email?: string;
        role?: "user" | "admin";
    }>;
}, "strip", z.ZodTypeAny, {
    user?: {
        email?: string;
        role?: "user" | "admin";
    };
    type?: string;
    accessToken?: string;
    refreshToken?: string;
}, {
    user?: {
        email?: string;
        role?: "user" | "admin";
    };
    type?: string;
    accessToken?: string;
    refreshToken?: string;
}>>;
export declare class AuthOutput extends AuthOutput_base {
}
declare const GoogleAuthDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    socialId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    socialId?: string;
}, {
    socialId?: string;
}>>;
export declare class GoogleAuthDto extends GoogleAuthDto_base {
}
declare const RefreshDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken?: string;
}, {
    refreshToken?: string;
}>>;
export declare class RefreshDto extends RefreshDto_base {
}
declare const AuthDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>>;
export declare class AuthDto extends AuthDto_base {
}
export {};
