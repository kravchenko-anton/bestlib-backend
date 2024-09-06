export declare const catalogSearchFields: (query: string) => {
    isPublic: true;
    OR: {
        title: {
            mode: "insensitive";
            contains: string;
        };
    }[];
};
