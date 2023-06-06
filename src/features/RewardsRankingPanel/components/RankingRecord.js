export const RankingRecord = ({ user, rewardPoints, rank, rankingMonths }) => (
  <tr>
    <td className="cell cell--number">{rank}</td>
    <td className="cell">{user.name}</td>
    <td className={`cell cell--number`}>
      <strong>{rewardPoints.total}</strong>
    </td>
    {rankingMonths.map((month) => (
      <td key={month} className={`cell cell--number`}>
        {rewardPoints.byMonth[month] || '-'}
      </td>
    ))}
  </tr>
)
