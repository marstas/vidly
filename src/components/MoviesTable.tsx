import React from 'react';
import { Movie } from '../models';
import Table from './common/Table';
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
    <Table
      data={activeMovies}
      columns={columns}
      sortColumn={sortColumn}
      onLike={onLike}
      onDelete={onDelete}
      onSort={onSort}
    />
  );
}
