import { ReadingHistory, UserCatalogOutput, UserLibraryOutput, UserStatistics } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    library(userId: string, dto: ReadingHistory[]): Promise<UserLibraryOutput>;
    syncHistory(userId: string, dto: ReadingHistory[]): Promise<void>;
    statistics(userId: string, dto: ReadingHistory[]): Promise<UserStatistics>;
    adjustGoal(userId: string, goal: number): Promise<void>;
    startReading(userId: string, slug: string): Promise<void>;
    finishReading(userId: string, slug: string): Promise<void>;
    removeFromLibrary(userId: string, slug: string): Promise<void>;
    toggleSave(userId: string, slug: string): Promise<boolean>;
    isSaved(userId: string, slug: string): Promise<boolean>;
    catalog(searchTerm: string, cursor: number): Promise<UserCatalogOutput>;
    remove(id: string): Promise<void>;
}
