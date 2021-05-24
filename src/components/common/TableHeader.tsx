import React from 'react';

export type Column = {
  path: string;
  label: string;
};

type TableHeaderProps = {
  columns: Column[];
  onSort: (columnName: string) => void;
};

export default function TableHeader({ columns, onSort }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.label}
            onClick={() => onSort(column.path)}
            scope="col"
          >
            {column.label}
          </th>
        ))}
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
  );
}
