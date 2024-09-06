"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionModule = void 0;
const tslib_1 = require("tslib");
const prisma_service_1 = require("../utils/services/prisma.service");
const common_1 = require("@nestjs/common");
const reaction_controller_1 = require("./reaction.controller");
const reaction_service_1 = require("./reaction.service");
let ReactionModule = class ReactionModule {
};
exports.ReactionModule = ReactionModule;
exports.ReactionModule = ReactionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [reaction_controller_1.ReactionController],
        providers: [reaction_service_1.ReactionService, prisma_service_1.PrismaService]
    })
], ReactionModule);
//# sourceMappingURL=reaction.module.js.map