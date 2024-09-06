"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const storage_dto_1 = require("./dto/storage.dto");
const storage_service_1 = require("./storage.service");
const storage_types_1 = require("./storage.types");
let StorageController = class StorageController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async upload(file, folder) {
        return this.uploadService.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder
        });
    }
};
exports.StorageController = StorageController;
tslib_1.__decorate([
    (0, common_1.Post)('/:folder'),
    (0, swagger_1.ApiParam)({
        name: 'folder',
        enum: storage_types_1.StorageFolderArray
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'File uploaded', type: storage_dto_1.UploadOutputDto }),
    tslib_1.__param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: Number(process.env.MAX_UPLOAD_SIZE)
            })
        ]
    }))),
    tslib_1.__param(1, (0, common_1.Param)('folder')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StorageController.prototype, "upload", null);
exports.StorageController = StorageController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('storage'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('storage'),
    (0, auth_decorator_1.Auth)('admin'),
    tslib_1.__metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map