import {
	StorageFolderArray,
	StorageFolderType
} from '@/src/storage/storage.types';
import type { EnvConfig } from '@/src/utils/config/env-config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import sharp from 'sharp';
import { serverError } from '../utils/helpers/server-error';
import { optimizeFilename } from '../utils/helpers/string.functions';

@Injectable()
export class StorageService {
	private readonly s3 = new S3Client({
		endpoint: this.configService.get('AWS_ENDPOINT'),
		region: this.configService.get('AWS_REGION'),
		credentials: {
			accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') as string,
			secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') as string
		}
	});

	constructor(private readonly configService: ConfigService<EnvConfig>) {}

	async upload({
		file,
		fileName,
		folder
	}: {
		file: Buffer;
		fileName: string;
		folder: StorageFolderType;
	}) {
		console.log('upload called with:', { fileName, folder });
		if (!StorageFolderArray.includes(folder)) {
			console.error('upload error: Invalid folder name');
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid folder name');
		}
		const optimizedFile = await this.optimizeFile(file, folder);

		const optimizedFileName = `${folder}/${
			Date.now() - Math.floor(Math.random() * 1000)
		}-${optimizeFilename(fileName)}`;
		await this.s3
			.send(
				new PutObjectCommand({
					Bucket: this.configService.get('AWS_BUCKET'),
					Key: optimizedFileName,
					Body: optimizedFile,
					ACL: 'public-read',
					ContentDisposition: 'inline'
				})
			)
			.catch(error => {
				console.error('upload error: Failed to upload file', error);
				throw serverError(HttpStatus.BAD_REQUEST, 'Failed to upload file');
			});
		console.log('upload result:', { name: optimizedFileName });
		return {
			name: optimizedFileName
		};
	}

	private optimizeFile = async (file: Buffer, folder: string) => {
		console.log('optimizeFile called with:', { folder });
		switch (folder) {
			case 'booksCovers': {
				const optimized = await sharp(file)
					.resize({
						height: 1200,
						width: 800
					})
					.toFormat('jpeg', { progressive: true, quality: 80 })
					.toBuffer();
				console.log('optimizeFile result for booksCovers:', optimized);
				return optimized;
			}
			case 'authorsPictures': {
				const optimized = await sharp(file)
					.resize({
						height: 500,
						width: 500
					})
					.toFormat('jpeg', { progressive: true, quality: 60 })
					.toBuffer();
				console.log('optimizeFile result for authorsPictures:', optimized);
				return optimized;
			}
			default: {
				console.log('optimizeFile result for default:', file);
				return file;
			}
		}
	};
}
