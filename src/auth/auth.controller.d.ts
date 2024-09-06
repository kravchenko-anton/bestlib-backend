import { AuthDto, AuthOutput, GoogleAuthDto, RefreshDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleSign(dto: GoogleAuthDto): Promise<AuthOutput>;
    mailRegister(dto: AuthDto): Promise<AuthOutput>;
    mailLogin(dto: AuthDto): Promise<AuthOutput>;
    refreshToken(dto: RefreshDto): Promise<AuthOutput>;
}
