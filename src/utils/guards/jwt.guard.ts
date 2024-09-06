import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard('jwt') {}

export class MockJwtGuard extends AuthGuard('jwt') {
	override canActivate() {
		return true
	}
}
