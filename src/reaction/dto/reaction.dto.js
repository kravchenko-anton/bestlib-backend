"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionByBookOutput = exports.ReactionListOutput = exports.UpdateReaction = exports.CreateReaction = void 0;
const zod_nestjs_1 = require("@anatine/zod-nestjs");
const zod_openapi_1 = require("@anatine/zod-openapi");
const zod_1 = require("zod");
const create_reaction_schema_1 = require("./create.reaction.schema");
const update_reaction_schema_1 = require("./update.reaction.schema");
const reaction_schema_1 = require("./reaction.schema");
(0, zod_openapi_1.extendZodWithOpenApi)(zod_1.z);
class CreateReaction extends (0, zod_nestjs_1.createZodDto)(create_reaction_schema_1.CreateReactionSchema) {
}
exports.CreateReaction = CreateReaction;
class UpdateReaction extends (0, zod_nestjs_1.createZodDto)(update_reaction_schema_1.UpdateReactionSchema) {
}
exports.UpdateReaction = UpdateReaction;
class ReactionListOutput extends (0, zod_nestjs_1.createZodDto)(reaction_schema_1.ReactionListOutputSchema) {
}
exports.ReactionListOutput = ReactionListOutput;
class ReactionByBookOutput extends (0, zod_nestjs_1.createZodDto)(reaction_schema_1.ReactionByBookOutputSchema) {
}
exports.ReactionByBookOutput = ReactionByBookOutput;
//# sourceMappingURL=reaction.dto.js.map