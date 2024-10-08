import { Auth } from '@/src/auth/decorators/auth.decorator';
import { CurrentUser } from '@/src/auth/decorators/user.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { ReactionOutput, ReactionPayload } from 'src/reaction/reaction.dto';
import { ReactionService } from './reaction.service';

@ApiBearerAuth()
@Controller('reaction')
@ApiTags('👍 Reaction')
export class ReactionController {
	constructor(private readonly reactionService: ReactionService) {}

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
}
