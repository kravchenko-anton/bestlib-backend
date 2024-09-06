"use strict";
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const tslib_1 = require("tslib");
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const server_error_1 = require("../utils/helpers/server-error");
const string_functions_1 = require("../utils/helpers/string.functions");
const storage_types_1 = require("./storage.types");
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new client_s3_1.S3Client({
            endpoint: this.configService.get('AWS_ENDPOINT'),
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
            }
        });
    }
    async upload({ file, fileName, folder }) {
        if (!storage_types_1.StorageFolderArray.includes(folder)) {
            throw (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Invalid folder name');
        }
        const optimizedFile = folder === storage_types_1.storageFolder.ebooks || folder === storage_types_1.storageFolder.imagesInBook
            ? file
            : await (0, sharp_1.default)(file)
                .resize({
                height: 1200,
                width: 800
            })
                .toFormat('jpeg', { progressive: true, quality: 50 })
                .toBuffer();
        const optimizedFileName = `${folder}/${Date.now() - Math.floor(Math.random() * 1000)}-${(0, string_functions_1.optimizeFilename)(fileName)}`;
        await this.s3
            .send(new client_s3_1.PutObjectCommand({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: optimizedFileName,
            Body: optimizedFile,
            ACL: 'public-read',
            ContentDisposition: 'inline'
        }))
            .catch(() => (0, server_error_1.serverError)(common_1.HttpStatus.BAD_REQUEST, 'Failed to upload file'));
        common_1.Logger.log(`File ${optimizedFileName} uploaded to ${folder} folder`, StorageService_1.name);
        return {
            name: optimizedFileName
        };
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map