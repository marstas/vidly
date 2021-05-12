import React from 'react';
import { Movie } from '../models';
import Like from './common/Like';

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
  return (
    <table className="table caption-top">
      <caption>Showing {activeMovies.length} movies in the database.</caption>
      <thead>
        <tr>
          <th onClick={() => onSort('title')} scope="col">
            Title
          </th>
          <th onClick={() => onSort('genre.name')} scope="col">
            Genre
          </th>
          <th onClick={() => onSort('numberInStock')} scope="col">
            Stock
          </th>
          <th onClick={() => onSort('dailyRentalRate')} scope="col">
            Rate
          </th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
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
