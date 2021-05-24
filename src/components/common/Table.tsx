import React from 'react';
import { SortColumn } from '../Movies';
import TableBody from './TableBody';
import TableHeader, { Column } from './TableHeader';

type TableProps<T> = {
  data: T[];
  columns: Column[];
  sortColumn: SortColumn;
  onLike: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onSort: (columnName: string) => void;
};

export default function Table<T>({
  data,
  columns,
  sortColumn,
  onLike,
  onDelete,
  onSort
}: TableProps<T>) {
  return (
    <table className="table caption-top">
      <TableHeader sortColumn={sortColumn} columns={columns} onSort={onSort} />
      <TableBody
        data={data}
        columns={columns}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
}
