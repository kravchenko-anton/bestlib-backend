import {
	type CanActivate,
	type ExecutionContext,
	HttpStatus,
	Injectable
} from '@nestjs/common';
import { Role, type User } from '@prisma/client';
import { serverError } from '../helpers/server-error';

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>();
		const user = request.user;
		if (user.role !== Role.admin)
			throw serverError(
				HttpStatus.FORBIDDEN,
				"You don't have permission to access this resource."
			);
		return true;
	}
}
