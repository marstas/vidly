import React, { useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/Like';

export default function Movies() {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movieId: string) => {
    const indx = movies.findIndex((movie) => movie._id === movieId);
    movies.splice(indx, 1);
    setMovies([...movies]);
  };

  const handleLike = (movieId: string) => {
    const indx = movies.findIndex((movie) => movie._id === movieId);
    movies[indx].liked = !movies[indx].liked;
    setMovies([...movies]);
  };

  return movies.length > 0 ? (
    <table className="table caption-top">
      <caption>Showing {movies.length} movies in the database.</caption>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onLike={() => handleLike(movie._id)} liked={movie.liked} />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h3>There are no movies available.</h3>
  );
}
