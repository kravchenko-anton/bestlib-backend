import { PrismaService } from '../utils/services/prisma.service';
import type { UpdateRecommendationDto } from './recommendation.dto';
export declare class RecommendationService {
    private prisma;
    constructor(prisma: PrismaService);
    userSelectedGenresById(userId: string): Promise<{
        id: string;
        name: string;
        icon: string;
        emoji: string;
    }[]>;
    updateSelectedGenres(id: string, dto: UpdateRecommendationDto): Promise<void>;
    private checkUserExist;
}
