import type { EnvConfig } from '@/src/utils/config/env-config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import sharp from 'sharp';
import { serverError } from '../utils/helpers/server-error';
import { optimizeFilename } from '../utils/helpers/string.functions';
import {
	StorageFolderArray,
	StorageFolderType
} from '@/src/storage/storage.types';

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
		if (!StorageFolderArray.includes(folder)) {
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
			.catch(() =>
				serverError(HttpStatus.BAD_REQUEST, 'Failed to upload file')
			);
		Logger.log(
			`File ${optimizedFileName} uploaded to ${folder} folder`,
			StorageService.name
		);
		return {
			name: optimizedFileName
		};
	}

	private optimizeFile = async (file: Buffer, folder: string) => {
		switch (folder) {
			case 'booksCovers': {
				return sharp(file)
					.resize({
						height: 1200,
						width: 800
					})
					.toFormat('jpeg', { progressive: true, quality: 80 })
					.toBuffer();
			}
			case 'authorsPictures': {
				return sharp(file)
					.resize({
						height: 500,
						width: 500
					})
					.toFormat('jpeg', { progressive: true, quality: 60 })
					.toBuffer();
			}
			default: {
				return file;
			}
		}
	};
}
