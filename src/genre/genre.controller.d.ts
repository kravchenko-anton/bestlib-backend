import { FindOneGenreOutput, ShortGenre } from './dto/genre.dto';
import { GenreService } from './genre.service';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    catalog(): Promise<ShortGenre[]>;
    byId(genreId: string): Promise<FindOneGenreOutput>;
}
