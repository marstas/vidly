import React, { useState } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import { getOnePage } from '../utils';
import Like from './common/Like';
import ListGroup from './common/ListGroup';
import Pagination from './common/Pagination';

export interface Genre {
  _id: string;
  name: string;
}

export default function Movies() {
  const allMovies = getMovies();
  const allGenres = getGenres();
  allGenres.unshift({ _id: 'all-genres', name: 'All Genres' });

  const [activeMovies, setActiveMovies] = useState(getOnePage(allMovies, 1));
  const [filteredMovies, setFilteredMovies] = useState(allMovies);
  const [activeGenre, setActiveGenre] = useState(allGenres[0]);
  const [activePage, setActivePage] = useState(1);

  const handleDelete = (movieId: string) => {
    const indx = filteredMovies.findIndex((movie) => movie._id === movieId);
    filteredMovies.splice(indx, 1);
    setActiveMovies(getOnePage([...filteredMovies], activePage));
  };

  const handleLike = (movieId: string) => {
    const indx = activeMovies.findIndex((movie) => movie._id === movieId);
    activeMovies[indx].liked = !activeMovies[indx].liked;
    setActiveMovies([...activeMovies]);
  };

  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
    setActiveMovies(getOnePage(filteredMovies, newPage));
  };

  const handleGenreChange = (newGenre: Genre) => {
    let newMovies;

    if (newGenre === allGenres[0]) {
      newMovies = allMovies;
    } else {
      newMovies = allMovies.filter(
        (movie) => movie.genre.name === newGenre.name
      );
    }

    setActiveGenre(newGenre);
    setActivePage(1);
    setFilteredMovies(newMovies);
    setActiveMovies(getOnePage(newMovies, 1));
  };

  return allMovies.length > 0 ? (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-3 mt-3">
        <ListGroup
          items={allGenres}
          activeItem={activeGenre}
          onItemChange={handleGenreChange}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-9">
        <table className="table caption-top">
          <caption>
            Showing {activeMovies.length} movies in the database.
          </caption>
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
          itemsCount={filteredMovies.length}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  ) : (
    <h3>There are no movies available.</h3>
  );
}
