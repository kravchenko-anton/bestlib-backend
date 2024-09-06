import { GptExplain, TranslateText } from '@/src/reading/reading.dto';
import { ReadingService } from './reading.service';
export declare class ReadingController {
    private readonly readingService;
    constructor(readingService: ReadingService);
    gptExplain(dto: GptExplain): Promise<string>;
    translate(dto: TranslateText): Promise<import("deepl-node").TextResult>;
}
