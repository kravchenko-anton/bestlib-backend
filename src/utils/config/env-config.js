"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfigSchema = void 0;
/* eslint-disable */
const zod_1 = require("zod");
exports.envConfigSchema = zod_1.z.object({
    JWT_SECRET: zod_1.z.string(),
    AWS_REGION: zod_1.z.string(),
    AWS_BUCKET: zod_1.z.string(),
    AWS_ENDPOINT: zod_1.z.string(),
    AWS_ACCESS_KEY_ID: zod_1.z.string(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    GOOGLE_CLIENT_ID: zod_1.z.string(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string(),
    NODE_ENV: zod_1.z.string(),
    SENTRY_DSN: zod_1.z.string(),
    MAX_UPLOAD_SIZE: zod_1.z.string().transform(v => parseInt(v)),
    PORT: zod_1.z.string().transform(v => parseInt(v)),
    SERVER_URL: zod_1.z.string(),
    STORAGE_URL: zod_1.z.string(),
    OPENAI_API_KEY: zod_1.z.string(),
    DEEPL_API_KEY: zod_1.z.string()
});
//# sourceMappingURL=env-config.js.map