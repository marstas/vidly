import React from 'react';
import { SortColumn } from '../Movies';

export type Column = {
  path: string;
  label: string;
};

type TableHeaderProps = {
  columns: Column[];
  sortColumn: SortColumn;
  onSort: (columnName: string) => void;
};

export default function TableHeader({
  columns,
  sortColumn,
  onSort
}: TableHeaderProps) {
  const renderSortIcon = (column: Column) => {
    if (column.path !== sortColumn.columnName) return null;
    if (sortColumn.sortOrder === 'asc') return <i className="fa fa-sort-up" />;
    return <i className="fa fa-sort-down" />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.label}
            onClick={() => onSort(column.path)}
            scope="col"
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
  );
}
