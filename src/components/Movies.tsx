import React, { useState } from 'react';
import { PAGE_SIZE } from '../constants';
import { getMovies } from '../services/fakeMovieService';
import { getOnePage } from '../utils';
import Like from './common/Like';
import Pagination from './common/Pagination';

export default function Movies() {
  const allMovies = getMovies();
  const [activeMovies, setActiveMovies] = useState(getOnePage(allMovies, 1));
  const [activePage, setActivePage] = useState(1);

  const handleDelete = (movieId: string) => {
    const indx = allMovies.findIndex((movie) => movie._id === movieId);
    allMovies.splice(indx, 1);
    setActiveMovies(getOnePage([...allMovies], activePage));
  };

  const handleLike = (movieId: string) => {
    const indx = activeMovies.findIndex((movie) => movie._id === movieId);
    activeMovies[indx].liked = !activeMovies[indx].liked;
    setActiveMovies([...activeMovies]);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== activePage) {
      setActivePage(newPage);
      setActiveMovies(getOnePage(allMovies, newPage));
    }
  };

  return activeMovies.length > 0 ? (
    <>
      <table className="table caption-top">
        <caption>Showing {activeMovies.length} movies in the database.</caption>
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
          {activeMovies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  onLike={() => handleLike(movie._id)}
                  liked={movie.liked}
                />
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
      <Pagination
        numPages={Math.ceil(allMovies.length / PAGE_SIZE)}
        activePage={activePage}
        onPageChange={handlePageChange}
      />
    </>
  ) : (
    <h3>There are no movies available.</h3>
  );
}
