import React, { useState, useMemo } from 'react'
import { sortRecords } from '../utils'
import { RankingRecord } from './RankingRecord'
import { SortableCellHeader } from './SortableCellHeader'

const total_column_key = 'total'

export const Ranking = ({ rankingMonths, records }) => {
  const [sortBy, setSortBy] = useState(total_column_key)
  const sortedRecords = useMemo(
    () => (records && sortBy ? sortRecords([...records], sortBy) : []),
    [records, sortBy],
  )

  return (
    <table className="table" key="sort">
      <thead>
        <tr>
          <th className="cell">Rank</th>
          <th className="cell">Name</th>
          <SortableCellHeader
            columnKey={total_column_key}
            setSortBy={setSortBy}
            sortBy={sortBy}
            label="Total"
          />
          {rankingMonths.map((month) => (
            <SortableCellHeader
              key={month}
              columnKey={month}
              sortBy={sortBy}
              setSortBy={setSortBy}
              label={new Date(month).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRecords.map(({ user, rewardPoints }, index) => (
          <RankingRecord
            key={user.id}
            user={user}
            rewardPoints={rewardPoints}
            sort={sortBy}
            rank={index + 1}
            rankingMonths={rankingMonths}
          />
        ))}
      </tbody>
    </table>
  )
}