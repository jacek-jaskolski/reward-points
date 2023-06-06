export const SortableCellHeader = ({ columnKey, sortBy, setSortBy, label = columnKey }) => (
  <th
    className={`cell${sortBy === columnKey ? ' cell--sorted' : ''}`}
    onClick={() => setSortBy(columnKey)}
  >
    <a href="#" className="sort-by">
      {label}
    </a>
  </th>
)
