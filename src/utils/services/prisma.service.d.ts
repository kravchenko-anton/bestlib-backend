import type { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
declare global {
    var prisma: PrismaService | null;
}
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private static instance;
    constructor();
    onModuleInit(): Promise<void>;
}
declare let prisma: PrismaService;
export default prisma;
