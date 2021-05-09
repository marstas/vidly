import React, { useState } from 'react';
import { Genre } from '../models';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import { getOnePage } from '../utils';
import ListGroup from './common/ListGroup';
import Pagination from './common/Pagination';
import MoviesTable from './MoviesTable';

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
      newMovies = allMovies.filter((movie) => movie.genre._id === newGenre._id);
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
          nameProp="name"
          idProp="_id"
          onItemChange={handleGenreChange}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-9">
        <MoviesTable
          activeMovies={activeMovies}
          onDelete={handleDelete}
          onLike={handleLike}
        />
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
