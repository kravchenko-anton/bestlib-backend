import type { GptExplain, TranslateText } from '@/src/reading/reading.dto';
import type { EnvConfig } from '@/src/utils/config/env-config';
import { ConfigService } from '@nestjs/config';
import * as deepl from 'deepl-node';
export declare class ReadingService {
    configService: ConfigService<EnvConfig>;
    constructor(configService: ConfigService<EnvConfig>);
    private readonly openAi;
    private readonly deepl;
    translateText(dto: TranslateText): Promise<deepl.TextResult>;
    gptExplain(dto: GptExplain): Promise<string>;
}
