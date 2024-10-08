import { appName } from '@/src/utils/constants';
import { DocumentBuilder } from '@nestjs/swagger';

export const openApiConfig = new DocumentBuilder()
	.setTitle(appName)
	.setVersion('1.0')
	.addTag('👤 user', 'user service')
	.addTag('🔐 auth', 'auth service')
	.addTag('📙 book', 'book service')
	.addTag('📚 catalog', 'catalog service')
	.addTag('❤️ health', 'health service')
	.addTag('🔖 genre', 'genre service')
	.addTag('📁 storage', 'storage service')
	.addTag('⭐ impression', 'impression service')
	.addTag('📨 recommendation', 'recommendation service')
	.addTag('📦 parser', 'parser service')
	.addBearerAuth();

export const typesGeneratorConfigMobile = {
	webServerOptions: {
		enabled: process.env.NODE_ENV === 'development',
		path: 'api-docs'
	},
	fileGeneratorOptions: {
		enabled: process.env.NODE_ENV === 'development',
		outputFilePath: './openapi.json' // or ./openapi.json
	},

	clientGeneratorOptions: {
		enabled: process.env.NODE_ENV === 'development',
		type: 'typescript-axios',
		outputFolderPath: '../mobile/api-client',
		additionalProperties:
			'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
		openApiFilePath: './openapi.json',
		skipValidation: true
	}
};
export const typesGeneratorConfigAdmin = {
	webServerOptions: {
		enabled: process.env.NODE_ENV === 'development',
		path: 'api-docs'
	},
	fileGeneratorOptions: {
		enabled: process.env.NODE_ENV === 'development',
		outputFilePath: './openapi.json' // or ./openapi.json
	},

	clientGeneratorOptions: {
		enabled: process.env.NODE_ENV === 'development',
		type: 'typescript-axios',
		outputFolderPath: '../admin/api-client',
		additionalProperties:
			'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
		openApiFilePath: './openapi.json',
		skipValidation: true
	}
};
