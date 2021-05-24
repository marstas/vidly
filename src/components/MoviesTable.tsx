import React from 'react';
import { Movie } from '../models';
import TableBody from './common/TableBody';
import TableHeader from './common/TableHeader';
import { SortColumn } from './Movies';

type MoviesTableProps = {
  activeMovies: Movie[];
  sortColumn: SortColumn;
  onLike: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onSort: (columnName: string) => void;
};

export default function MoviesTable({
  activeMovies,
  sortColumn,
  onLike,
  onDelete,
  onSort
}: MoviesTableProps) {
  const columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' }
  ];

  return (
    <table className="table caption-top">
      <caption>Showing {activeMovies.length} movies in the database.</caption>
      <TableHeader sortColumn={sortColumn} columns={columns} onSort={onSort} />
      <TableBody
        data={activeMovies}
        columns={columns}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
}
