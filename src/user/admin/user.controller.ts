import { Auth } from '@/src/auth/decorators/auth.decorator';
import { UserCatalogOutput } from '@/src/user/user.dto';
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('admin/user')
@ApiTags('👤 admin-user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth('admin')
	@Get('admin/catalog')
	@ApiOkResponse({ type: UserCatalogOutput })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('cursor') cursor: number
	): Promise<UserCatalogOutput> {
		return this.userService.catalog(searchTerm || '', cursor);
	}

	@Auth('admin')
	@Delete('admin/remove/:id')
	async remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
