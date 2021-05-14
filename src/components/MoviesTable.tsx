import React from 'react';
import { Movie } from '../models';
import Like from './common/Like';
import TableHeader from './common/TableHeader';

type MoviesTableProps = {
  activeMovies: Movie[];
  onLike: (movieId: string) => void;
  onDelete: (movieId: string) => void;
  onSort: (columnName: string) => void;
};

export default function MoviesTable({
  activeMovies,
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
      <TableHeader columns={columns} onSort={onSort} />
      <tbody>
        {activeMovies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onLike={() => onLike(movie._id)} liked={movie.liked} />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(movie._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
