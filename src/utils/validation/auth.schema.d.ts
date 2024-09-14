import { z } from 'zod';
export declare const Role: {
    user: 'user';
    admin: 'admin';
};
export declare const AuthSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export declare const GoogleAuthSchema: z.ZodObject<{
    socialId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    socialId?: string;
}, {
    socialId?: string;
}>;
export declare const AuthUserSchema: z.ZodObject<{
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
export declare const AuthOutputSchema: z.ZodObject<{
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
}>;
export declare const RefreshSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken?: string;
}, {
    refreshToken?: string;
}>;
