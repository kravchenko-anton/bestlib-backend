import { UpdateRecommendationDto } from './recommendation.dto';
import { RecommendationService } from './recommendation.service';
export declare class RecommendationController {
    private readonly recommendationService;
    constructor(recommendationService: RecommendationService);
    updateRecommendation(userId: string, dto: UpdateRecommendationDto): Promise<void>;
    currentRecommendation(userId: string): Promise<{
        id: string;
        name: string;
        icon: string;
    }[] | null>;
}
