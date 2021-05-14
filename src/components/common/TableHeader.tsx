import React from 'react';

type TableHeaderProps = {
  columns: {
    path: string;
    label: string;
  }[];
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
