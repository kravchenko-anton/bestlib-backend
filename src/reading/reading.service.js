"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingService = void 0;
const tslib_1 = require("tslib");
const server_error_1 = require("../utils/helpers/server-error");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const deepl = tslib_1.__importStar(require("deepl-node"));
const openai_1 = tslib_1.__importDefault(require("openai"));
let ReadingService = class ReadingService {
    constructor(configService) {
        this.configService = configService;
        this.openAi = new openai_1.default({
            apiKey: this.configService.get('OPENAI_API_KEY')
        });
        this.deepl = new deepl.Translator(this.configService.get('DEEPL_API_KEY'));
    }
    async translateText(dto) {
        return this.deepl.translateText(dto.text, null, dto.targetLang, {
            context: dto.context
        });
    }
    async gptExplain(dto) {
        return this.openAi.chat.completions
            .create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: `
							Analyze the selected text from the book "${dto.bookTitle}".
							Selected Text: "${dto.selectedText}"
							Context: "${dto.context}"
							Please provide:
							1. Its significance within the context.
							2. Its role in the narrative or character development.
							3. The author's intended meaning.
							4. Any subtextual meanings.
							5. Its impact on the reader.
							Summarize in 2-3 sentences.Without mentioning the title of the book or the character's name.
							`
                }
            ]
        })
            .catch(error => {
            console.error(error);
            throw (0, server_error_1.serverError)(300, 'Failed to generate explanation');
        })
            .then(response => {
            if (!response.choices[0])
                throw (0, server_error_1.serverError)(300, 'Failed to generate explanation');
            return response.choices[0].message.content;
        });
    }
};
exports.ReadingService = ReadingService;
exports.ReadingService = ReadingService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], ReadingService);
//# sourceMappingURL=reading.service.js.map