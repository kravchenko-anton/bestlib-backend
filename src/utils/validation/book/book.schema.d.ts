import { z } from 'zod';
export declare const ShortBookSchema: z.ZodObject<{
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
}>;
export declare const BookSchema: z.ZodObject<z.objectUtil.extendShape<{
    description: z.ZodString;
    readingTime: z.ZodNumber;
    chapters: z.ZodNumber;
    rating: z.ZodNumber;
    isPublic: z.ZodBoolean;
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
}, {
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
}>, "strip", z.ZodTypeAny, {
    id?: string;
    picture?: string;
    description?: string;
    title?: string;
    readingTime?: number;
    chapters?: number;
    rating?: number;
    isPublic?: boolean;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    author?: {
        id?: string;
        name?: string;
    };
}, {
    id?: string;
    picture?: string;
    description?: string;
    title?: string;
    readingTime?: number;
    chapters?: number;
    rating?: number;
    isPublic?: boolean;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    author?: {
        id?: string;
        name?: string;
    };
}>;
export declare const FullBookSchema: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    description: z.ZodString;
    readingTime: z.ZodNumber;
    chapters: z.ZodNumber;
    rating: z.ZodNumber;
    isPublic: z.ZodBoolean;
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
}, {
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
}>, {
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    recommendable: z.ZodBoolean;
    ebook: z.ZodString;
    _count: z.ZodObject<{
        finishedBy: z.ZodNumber;
        readingBy: z.ZodNumber;
        savedBy: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        finishedBy?: number;
        savedBy?: number;
        readingBy?: number;
    }, {
        finishedBy?: number;
        savedBy?: number;
        readingBy?: number;
    }>;
    statistics: z.ZodArray<z.ZodObject<{
        endDate: z.ZodDate;
        progressDelta: z.ZodNumber;
        pagesRead: z.ZodNumber;
        readingTimeMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
        pagesRead?: number;
    }, {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
        pagesRead?: number;
    }>, "many">;
}>, "strict", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    picture?: string;
    _count?: {
        finishedBy?: number;
        savedBy?: number;
        readingBy?: number;
    };
    description?: string;
    title?: string;
    recommendable?: boolean;
    ebook?: string;
    readingTime?: number;
    chapters?: number;
    rating?: number;
    isPublic?: boolean;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    author?: {
        id?: string;
        name?: string;
    };
    statistics?: {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
        pagesRead?: number;
    }[];
}, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    picture?: string;
    _count?: {
        finishedBy?: number;
        savedBy?: number;
        readingBy?: number;
    };
    description?: string;
    title?: string;
    recommendable?: boolean;
    ebook?: string;
    readingTime?: number;
    chapters?: number;
    rating?: number;
    isPublic?: boolean;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    author?: {
        id?: string;
        name?: string;
    };
    statistics?: {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
        pagesRead?: number;
    }[];
}>;
export declare const CatalogOutputSchema: z.ZodObject<z.objectUtil.extendShape<{
    data: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        description: z.ZodString;
        readingTime: z.ZodNumber;
        chapters: z.ZodNumber;
        rating: z.ZodNumber;
        isPublic: z.ZodBoolean;
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
    }, {
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
    }>, "strip", z.ZodTypeAny, {
        id?: string;
        picture?: string;
        description?: string;
        title?: string;
        readingTime?: number;
        chapters?: number;
        rating?: number;
        isPublic?: boolean;
        genres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        author?: {
            id?: string;
            name?: string;
        };
    }, {
        id?: string;
        picture?: string;
        description?: string;
        title?: string;
        readingTime?: number;
        chapters?: number;
        rating?: number;
        isPublic?: boolean;
        genres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        author?: {
            id?: string;
            name?: string;
        };
    }>, "many">;
}, {
    canLoadMore: z.ZodBoolean;
    totalPages: z.ZodNumber;
}>, "strip", z.ZodTypeAny, {
    data?: {
        id?: string;
        picture?: string;
        description?: string;
        title?: string;
        readingTime?: number;
        chapters?: number;
        rating?: number;
        isPublic?: boolean;
        genres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    canLoadMore?: boolean;
    totalPages?: number;
}, {
    data?: {
        id?: string;
        picture?: string;
        description?: string;
        title?: string;
        readingTime?: number;
        chapters?: number;
        rating?: number;
        isPublic?: boolean;
        genres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    canLoadMore?: boolean;
    totalPages?: number;
}>;
export declare const infoBySlugSchema: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    description: z.ZodString;
    readingTime: z.ZodNumber;
    chapters: z.ZodNumber;
    rating: z.ZodNumber;
    isPublic: z.ZodBoolean;
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
}, {
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
}>, {
    fromSameAuthor: z.ZodArray<z.ZodObject<{
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
}>, "strip", z.ZodTypeAny, {
    id?: string;
    picture?: string;
    description?: string;
    title?: string;
    readingTime?: number;
    chapters?: number;
    rating?: number;
    isPublic?: boolean;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    author?: {
        id?: string;
        name?: string;
    };
    fromSameAuthor?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
}, {
    id?: string;
    picture?: string;
    description?: string;
    title?: string;
    readingTime?: number;
    chapters?: number;
    rating?: number;
    isPublic?: boolean;
    genres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    author?: {
        id?: string;
        name?: string;
    };
    fromSameAuthor?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
}>;
