import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDate;
    email: z.ZodString;
    socialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    picture: z.ZodString;
    fullName: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    email?: string;
    socialId?: string;
    picture?: string;
    fullName?: string;
    location?: string;
}, {
    id?: string;
    createdAt?: Date;
    email?: string;
    socialId?: string;
    picture?: string;
    fullName?: string;
    location?: string;
}>;
export declare const CatalogUserOutputSchema: z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
    email: z.ZodString;
    selectedGenres: z.ZodArray<z.ZodObject<{
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
    statistics: z.ZodArray<z.ZodObject<{
        endDate: z.ZodDate;
        progressDelta: z.ZodNumber;
        readingTimeMs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
    }, {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
    }>, "many">;
    _count: z.ZodObject<{
        savedBooks: z.ZodNumber;
        finishedBooks: z.ZodNumber;
        readingBooks: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        savedBooks?: number;
        finishedBooks?: number;
        readingBooks?: number;
    }, {
        savedBooks?: number;
        finishedBooks?: number;
        readingBooks?: number;
    }>;
}, {
    id: z.ZodString;
    createdAt: z.ZodDate;
    email: z.ZodString;
    socialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    picture: z.ZodString;
    fullName: z.ZodString;
    location: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    email?: string;
    socialId?: string;
    picture?: string;
    fullName?: string;
    location?: string;
    selectedGenres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    _count?: {
        savedBooks?: number;
        finishedBooks?: number;
        readingBooks?: number;
    };
    statistics?: {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
    }[];
}, {
    id?: string;
    createdAt?: Date;
    email?: string;
    socialId?: string;
    picture?: string;
    fullName?: string;
    location?: string;
    selectedGenres?: {
        id?: string;
        name?: string;
        icon?: string;
        emoji?: string;
    }[];
    _count?: {
        savedBooks?: number;
        finishedBooks?: number;
        readingBooks?: number;
    };
    statistics?: {
        endDate?: Date;
        readingTimeMs?: number;
        progressDelta?: number;
    }[];
}>;
export declare const UserCatalogOutputSchema: z.ZodObject<z.objectUtil.extendShape<{
    data: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
        id: z.ZodString;
        email: z.ZodString;
        selectedGenres: z.ZodArray<z.ZodObject<{
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
        statistics: z.ZodArray<z.ZodObject<{
            endDate: z.ZodDate;
            progressDelta: z.ZodNumber;
            readingTimeMs: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            endDate?: Date;
            readingTimeMs?: number;
            progressDelta?: number;
        }, {
            endDate?: Date;
            readingTimeMs?: number;
            progressDelta?: number;
        }>, "many">;
        _count: z.ZodObject<{
            savedBooks: z.ZodNumber;
            finishedBooks: z.ZodNumber;
            readingBooks: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            savedBooks?: number;
            finishedBooks?: number;
            readingBooks?: number;
        }, {
            savedBooks?: number;
            finishedBooks?: number;
            readingBooks?: number;
        }>;
    }, {
        id: z.ZodString;
        createdAt: z.ZodDate;
        email: z.ZodString;
        socialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        picture: z.ZodString;
        fullName: z.ZodString;
        location: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        id?: string;
        createdAt?: Date;
        email?: string;
        socialId?: string;
        picture?: string;
        fullName?: string;
        location?: string;
        selectedGenres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        _count?: {
            savedBooks?: number;
            finishedBooks?: number;
            readingBooks?: number;
        };
        statistics?: {
            endDate?: Date;
            readingTimeMs?: number;
            progressDelta?: number;
        }[];
    }, {
        id?: string;
        createdAt?: Date;
        email?: string;
        socialId?: string;
        picture?: string;
        fullName?: string;
        location?: string;
        selectedGenres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        _count?: {
            savedBooks?: number;
            finishedBooks?: number;
            readingBooks?: number;
        };
        statistics?: {
            endDate?: Date;
            readingTimeMs?: number;
            progressDelta?: number;
        }[];
    }>, "many">;
}, {
    canLoadMore: z.ZodBoolean;
    totalPages: z.ZodNumber;
}>, "strip", z.ZodTypeAny, {
    data?: {
        id?: string;
        createdAt?: Date;
        email?: string;
        socialId?: string;
        picture?: string;
        fullName?: string;
        location?: string;
        selectedGenres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        _count?: {
            savedBooks?: number;
            finishedBooks?: number;
            readingBooks?: number;
        };
        statistics?: {
            endDate?: Date;
            readingTimeMs?: number;
            progressDelta?: number;
        }[];
    }[];
    canLoadMore?: boolean;
    totalPages?: number;
}, {
    data?: {
        id?: string;
        createdAt?: Date;
        email?: string;
        socialId?: string;
        picture?: string;
        fullName?: string;
        location?: string;
        selectedGenres?: {
            id?: string;
            name?: string;
            icon?: string;
            emoji?: string;
        }[];
        _count?: {
            savedBooks?: number;
            finishedBooks?: number;
            readingBooks?: number;
        };
        statistics?: {
            endDate?: Date;
            readingTimeMs?: number;
            progressDelta?: number;
        }[];
    }[];
    canLoadMore?: boolean;
    totalPages?: number;
}>;
export declare const UserLibraryOutputSchema: z.ZodObject<{
    readingBooks: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
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
    }, {
        readingHistory: z.ZodNullable<z.ZodObject<{
            progress: z.ZodNumber;
            scrollPosition: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            scrollPosition?: number;
            progress?: number;
        }, {
            scrollPosition?: number;
            progress?: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        id?: string;
        picture?: string;
        readingHistory?: {
            scrollPosition?: number;
            progress?: number;
        };
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }, {
        id?: string;
        picture?: string;
        readingHistory?: {
            scrollPosition?: number;
            progress?: number;
        };
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }>, "many">;
    finishedBooks: z.ZodArray<z.ZodObject<{
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
    savedBooks: z.ZodArray<z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    savedBooks?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    finishedBooks?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    readingBooks?: {
        id?: string;
        picture?: string;
        readingHistory?: {
            scrollPosition?: number;
            progress?: number;
        };
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
}, {
    savedBooks?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    finishedBooks?: {
        id?: string;
        picture?: string;
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
    readingBooks?: {
        id?: string;
        picture?: string;
        readingHistory?: {
            scrollPosition?: number;
            progress?: number;
        };
        title?: string;
        rating?: number;
        author?: {
            id?: string;
            name?: string;
        };
    }[];
}>;
export declare const HistorySchema: z.ZodObject<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    startProgress: z.ZodNumber;
    endProgress: z.ZodNumber;
    progressDelta: z.ZodNumber;
    readingTimeMs: z.ZodNumber;
    scrollPosition: z.ZodNumber;
    bookId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bookId?: string;
    startDate?: Date;
    endDate?: Date;
    readingTimeMs?: number;
    scrollPosition?: number;
    startProgress?: number;
    endProgress?: number;
    progressDelta?: number;
}, {
    bookId?: string;
    startDate?: Date;
    endDate?: Date;
    readingTimeMs?: number;
    scrollPosition?: number;
    startProgress?: number;
    endProgress?: number;
    progressDelta?: number;
}>;
export declare const UserStatisticsSchema: z.ZodObject<{
    progressByCurrentWeek: z.ZodArray<z.ZodObject<{
        day: z.ZodString;
        isCurrentDay: z.ZodBoolean;
        readingTimeMs: z.ZodNumber;
        dayProgress: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        readingTimeMs?: number;
        day?: string;
        isCurrentDay?: boolean;
        dayProgress?: number;
    }, {
        readingTimeMs?: number;
        day?: string;
        isCurrentDay?: boolean;
        dayProgress?: number;
    }>, "many">;
    pepTalk: z.ZodString;
    goalMinutes: z.ZodNumber;
    userSteak: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    goalMinutes?: number;
    progressByCurrentWeek?: {
        readingTimeMs?: number;
        day?: string;
        isCurrentDay?: boolean;
        dayProgress?: number;
    }[];
    pepTalk?: string;
    userSteak?: number;
}, {
    goalMinutes?: number;
    progressByCurrentWeek?: {
        readingTimeMs?: number;
        day?: string;
        isCurrentDay?: boolean;
        dayProgress?: number;
    }[];
    pepTalk?: string;
    userSteak?: number;
}>;
