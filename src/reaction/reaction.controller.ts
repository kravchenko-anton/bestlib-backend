import { Auth } from '@/src/auth/decorators/auth.decorator';
import { CurrentUser } from '@/src/auth/decorators/user.decorator';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import {
	CreateReaction,
	ReactionByBookOutput,
	ReactionListOutput,
	ReactionOutput,
	ReactionPayload,
	UpdateReaction
} from 'src/reaction/reaction.dto';
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
	@Post('/sync-reaction')
	@ApiBody({ type: ReactionPayload })
	@ApiOkResponse({ type: [ReactionOutput] })
	async syncReaction(
		@CurrentUser('id') userId: string,
		@Body() dto: ReactionPayload
	): Promise<ReactionOutput[]> {
		return this.reactionService.syncReaction(userId, dto);
	}

	@Auth()
	@Get('/reaction-list')
	@ApiOkResponse({ type: [ReactionListOutput] })
	reactionList(@CurrentUser('id') userId: string) {
		return this.reactionService.reactionList(userId);
	}

	@Auth()
	@Get('/reaction-by-bookId/:bookId')
	@ApiOkResponse({ type: ReactionByBookOutput, isArray: true })
	reactionByBook(
		@Param('bookId') id: string,
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
