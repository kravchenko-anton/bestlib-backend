import { PrismaService } from '@/src/utils/services/prisma.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService]
})
export class UserModule {}
