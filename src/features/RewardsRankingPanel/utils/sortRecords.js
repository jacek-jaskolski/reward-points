import { total_column_key } from '../const'

export const sortRecords = (records, sortBy) =>
  records.sort((a, b) => {
    const aPointsForSortBy =
      sortBy === total_column_key ? a.rewardPoints.total : a.rewardPoints.byMonth[sortBy] ?? 0
    const bPointsForSortBy =
      sortBy === total_column_key ? b.rewardPoints.total : b.rewardPoints.byMonth[sortBy] ?? 0

    return bPointsForSortBy - aPointsForSortBy
  })
