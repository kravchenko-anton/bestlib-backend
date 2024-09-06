"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticReduce = void 0;
const emptyStatistic = (initialDate = new Date()) => ({
    startDate: initialDate,
    endDate: initialDate,
    readingTimeMs: 0,
    progressDelta: 0,
    pagesCount: 0
});
const statisticReduce = ({ statistics, nowDate, initialDate }) => [
    ...(initialDate ? [emptyStatistic(initialDate)] : []),
    ...statistics,
    ...(nowDate ? [emptyStatistic()] : [])
].reduce((accumulator, current) => {
    const exist = accumulator.find(({ startDate }) => startDate === current.startDate);
    if (exist) {
        exist.readingTimeMs += current.readingTimeMs;
        exist.progressDelta = Math.max(exist.progressDelta, current.progressDelta);
        exist.pagesRead = Math.round((exist.progressDelta * current.pagesCount) / 100);
    }
    else {
        accumulator.push({
            ...current,
            pagesRead: Math.round((current.progressDelta * current.pagesCount) / 100)
        });
    }
    return accumulator;
}, []);
exports.statisticReduce = statisticReduce;
//# sourceMappingURL=statisticReduce.service.js.map