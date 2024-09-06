import { UploadOutputDto } from './dto/storage.dto';
import { StorageService } from './storage.service';
import { StorageFolderType } from '@/src/storage/storage.types';
export declare class StorageController {
    private readonly uploadService;
    constructor(uploadService: StorageService);
    upload(file: Express.Multer.File, folder: StorageFolderType): Promise<UploadOutputDto>;
}
