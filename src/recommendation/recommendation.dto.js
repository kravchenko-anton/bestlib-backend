"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecommendationDto = exports.UpdateRecommendationDtoSchema = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_1 = require("zod");
exports.UpdateRecommendationDtoSchema = zod_1.z.object({
    genreSlugs: zod_1.z.array(zod_1.z.string()).min(1)
});
class UpdateRecommendationDto extends (0, zod_nestjs_1.createZodDto)(exports.UpdateRecommendationDtoSchema) {
}
exports.UpdateRecommendationDto = UpdateRecommendationDto;
//# sourceMappingURL=recommendation.dto.js.map