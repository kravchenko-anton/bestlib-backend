export type StatisticReduceOutputType = {
	startDate: Date
	endDate: Date
	readingTimeMs: number
	progressDelta: number
	pagesRead: number
}[]
const emptyStatistic = (initialDate = new Date()) => ({
	startDate: initialDate,
	endDate: initialDate,
	readingTimeMs: 0,
	progressDelta: 0,
	pagesCount: 0
})
export const statisticReduce = ({
	statistics,
	nowDate,
	initialDate
}: {
	statistics: {
		startDate: Date
		endDate: Date
		readingTimeMs: number
		progressDelta: number
		pagesCount: number
	}[]
	initialDate?: Date
	nowDate?: boolean
}): StatisticReduceOutputType =>
	[
		...(initialDate ? [emptyStatistic(initialDate)] : []),
		...statistics,
		...(nowDate ? [emptyStatistic()] : [])
	].reduce<StatisticReduceOutputType>((accumulator, current) => {
		const exist = accumulator.find(
			({ startDate }) => startDate === current.startDate
		)
		if (exist) {
			exist.readingTimeMs += current.readingTimeMs
			exist.progressDelta = Math.max(exist.progressDelta, current.progressDelta)
			exist.pagesRead = Math.round(
				(exist.progressDelta * current.pagesCount) / 100
			)
		} else {
			accumulator.push({
				...current,
				pagesRead: Math.round(
					(current.progressDelta * current.pagesCount) / 100
				)
			})
		}
		return accumulator
	}, [])
