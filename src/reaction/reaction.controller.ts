import { Auth } from '@/src/auth/decorators/auth.decorator';
import { CurrentUser } from '@/src/auth/decorators/user.decorator';
import {
	CreateReaction,
	ReactionByBookOutput,
	ReactionListOutput,
	UpdateReaction
} from '@/src/reaction/dto/reaction.dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { ReactionService } from './reaction.service';

@ApiBearerAuth()
@Controller('reaction')
@ApiTags('👍 Reaction')
export class ReactionController {
	constructor(private readonly reactionService: ReactionService) {}

	@Auth()
	@Post('/create')
	@ApiBody({ type: CreateReaction })
	create(@CurrentUser('id') userId: string, @Body() dto: CreateReaction) {
		return this.reactionService.create(userId, dto);
	}

	@Auth()
	@Get('/reaction-list')
	@ApiOkResponse({ type: [ReactionListOutput] })
	reactionList(@CurrentUser('id') userId: string) {
		return this.reactionService.reactionList(userId);
	}

	@Auth()
	@Get('/reaction-by-bookId/:id')
	@ApiOkResponse({ type: ReactionByBookOutput, isArray: true })
	reactionByBook(
		@Param('bookSlug') id: string,
		@CurrentUser('id') userId: string
	): Promise<ReactionByBookOutput[]> {
		return this.reactionService.reactionByBook(id, userId);
	}

	@Auth()
	@Post('/update')
	@ApiBody({ type: UpdateReaction })
	update(@CurrentUser('id') userId: string, @Body() dto: UpdateReaction) {
		return this.reactionService.update(userId, dto);
	}
	@Auth()
	@Put('/delete/:id')
	remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.reactionService.remove(id, userId);
	}
}
