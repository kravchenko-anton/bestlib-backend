import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import {
	ReadingHistory,
	UserCatalogOutput,
	UserLibraryOutput,
	UserStatistics
} from './user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user')
@ApiTags('👤 user')
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Auth()
	@Post('/library')
	@ApiOkResponse({ type: UserLibraryOutput })
	@ApiBody({ type: [ReadingHistory] })
	async library(
		@CurrentUser('id') userId: string,

		@Body() dto: ReadingHistory[]
	): Promise<UserLibraryOutput> {
		await this.usersService.syncHistory(dto, userId);
		return this.usersService.library(userId);
	}

	@Auth()
	@Post('/sync-history')
	@ApiBody({ type: [ReadingHistory] })
	async syncHistory(
		@CurrentUser('id') userId: string,
		@Body() dto: ReadingHistory[]
	) {
		await this.usersService.syncHistory(dto, userId);
	}

	@Auth()
	@Post('/statistics')
	@ApiBody({ type: [ReadingHistory] })
	@ApiOkResponse({ type: UserStatistics })
	async statistics(
		@CurrentUser('id') userId: string,
		@Body() dto: ReadingHistory[]
	): Promise<UserStatistics> {
		await this.usersService.syncHistory(dto, userId);
		return this.usersService.userStatistics(userId);
	}

	@Auth()
	@Patch('/adjust-goal')
	async adjustGoal(
		@CurrentUser('id') userId: string,
		@Query('goal') goal: number
	) {
		return this.usersService.adjustGoal(userId, Number(goal) || 0);
	}

	@Auth()
	@Patch('/start-reading/:id')
	async startReading(
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.usersService.startReading(userId, id);
	}

	@Auth()
	@Patch('/finish-reading/:id')
	async finishReading(
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.usersService.finishReading(userId, id);
	}

	@Auth()
	@Patch('/remove-from-library/:id')
	async removeFromLibrary(
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.usersService.removeFromLibrary(userId, id);
	}

	@Auth()
	@Patch('/toggle-save/:id')
	@ApiOkResponse({ type: Boolean })
	async toggleSave(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.usersService.toggleSave(userId, id);
	}

	@Auth()
	@Get('/is-saved/:id')
	@ApiOkResponse({ type: Boolean })
	async isSaved(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.usersService.isSaved(userId, id);
	}

	// admin
	@Auth('admin')
	@Get('admin/catalog')
	@ApiOkResponse({ type: UserCatalogOutput })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('cursor') cursor: number
	): Promise<UserCatalogOutput> {
		return this.usersService.catalog(searchTerm || '', cursor);
	}

	@Auth('admin')
	@Delete('admin/remove/:id')
	async remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
