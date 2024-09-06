import { z } from 'zod';
declare const FeaturedOutput_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    picksOfWeek: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            name?: string;
        }, {
            id?: string;
            name?: string;
        }>;
        rating: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }>, "many">;
    genres: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        icon: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }, {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }>, "many">;
    bestSellingBooks: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            name?: string;
        }, {
            id?: string;
            name?: string;
        }>;
        rating: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }>, "many">;
    newReleases: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            name?: string;
        }, {
            id?: string;
            name?: string;
        }>;
        rating: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }>, "many">;
    booksBySelectedGenres: z.ZodArray<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        picture: z.ZodString;
        author: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            name?: string;
        }, {
            id?: string;
            name?: string;
        }>;
        rating: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }, {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }>, "many">, "many">;
}, "strip", z.ZodTypeAny, {
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    picksOfWeek?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    bestSellingBooks?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    newReleases?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    booksBySelectedGenres?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[][];
}, {
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    picksOfWeek?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    bestSellingBooks?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    newReleases?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    booksBySelectedGenres?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[][];
}>>;
export declare class FeaturedOutput extends FeaturedOutput_base {
}
export {};
