import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto, AuthOutput, GoogleAuthDto, RefreshDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('🔐 auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/google-sign')
	@ApiOkResponse({
		description: 'Return access and refresh token',
		type: AuthOutput
	})
	@ApiBody({
		type: GoogleAuthDto,
		description: 'Sign in with google account'
	})
	async googleSign(@Body() dto: GoogleAuthDto): Promise<AuthOutput> {
		return this.authService.googleSign(dto);
	}

	@Post('/mail-register')
	@ApiBody({
		type: AuthDto,
		description: 'Register new user'
	})
	@ApiOkResponse({
		description: 'Return access and refresh token',
		type: AuthOutput
	})
	async mailRegister(@Body() dto: AuthDto): Promise<AuthOutput> {
		return this.authService.register(dto);
	}

	@Post('/mail-login')
	@ApiBody({
		type: AuthDto,
		description: 'Login user'
	})
	@ApiOkResponse({
		description: 'Return access and refresh token',
		type: AuthOutput
	})
	async mailLogin(@Body() dto: AuthDto): Promise<AuthOutput> {
		return this.authService.login(dto);
	}

	@Post('/refresh')
	@ApiBody({
		type: RefreshDto,
		description: 'Refresh access token'
	})
	@ApiOkResponse({
		description: 'Return access token',
		type: AuthOutput
	})
	async refreshToken(@Body() dto: RefreshDto): Promise<AuthOutput> {
		return this.authService.refresh(dto.refreshToken);
	}
}
