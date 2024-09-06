"use strict";
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super();
        if (!PrismaService_1.instance) {
            PrismaService_1.instance = this;
        }
        return PrismaService_1.instance;
    }
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
    // inject config service here
    ,
    tslib_1.__metadata("design:paramtypes", [])
], PrismaService);
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaService();
}
else {
    if (!global.prisma) {
        global.prisma = new PrismaService();
    }
    prisma = global.prisma;
}
exports.default = prisma;
//# sourceMappingURL=prisma.service.js.map