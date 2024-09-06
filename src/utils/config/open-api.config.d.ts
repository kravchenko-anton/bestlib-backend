import { DocumentBuilder } from '@nestjs/swagger';
export declare const openApiConfig: DocumentBuilder;
export declare const typesGeneratorConfig: {
    webServerOptions: {
        enabled: boolean;
        path: string;
    };
    fileGeneratorOptions: {
        enabled: boolean;
        outputFilePath: string;
    };
    clientGeneratorOptions: {
        enabled: boolean;
        type: string;
        outputFolderPath: string;
        additionalProperties: string;
        openApiFilePath: string;
        skipValidation: boolean;
    };
};
