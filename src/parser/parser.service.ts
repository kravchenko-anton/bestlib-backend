import { HttpStatus, Injectable } from '@nestjs/common';
import { serverError } from '../utils/helpers/server-error';

import { getEbook } from './helpers/unfold-ebook';

@Injectable()
export class ParserService {
	constructor() {}

	async unfold(file: Express.Multer.File) {
		if (!file.buffer && file.mimetype !== 'application/epub+zip')
			throw serverError(HttpStatus.BAD_REQUEST, 'Invalid file');
		return getEbook(file.buffer);
	}
}
