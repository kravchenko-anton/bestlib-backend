import type { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
export declare const getJwtConfig: (config: ConfigService) => Promise<JwtModuleOptions>;
