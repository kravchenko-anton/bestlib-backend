export type StatisticReduceOutputType = {
    startDate: Date;
    endDate: Date;
    readingTimeMs: number;
    progressDelta: number;
    pagesRead: number;
}[];
export declare const statisticReduce: ({ statistics, nowDate, initialDate }: {
    statistics: {
        startDate: Date;
        endDate: Date;
        readingTimeMs: number;
        progressDelta: number;
        pagesCount: number;
    }[];
    initialDate?: Date;
    nowDate?: boolean;
}) => StatisticReduceOutputType;
