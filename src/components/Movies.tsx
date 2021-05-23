import React, { useState } from 'react';
import { Genre, Movie } from '../models';
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
  const [sortAsc, setSortAsc] = useState(true);

  const handleDelete = (itemId: string) => {
    const indx = filteredMovies.findIndex((movie) => movie._id === itemId);
    filteredMovies.splice(indx, 1);
    setActiveMovies(getOnePage([...filteredMovies], activePage));
  };

  const handleLike = (itemId: string) => {
    const indx = activeMovies.findIndex((movie) => movie._id === itemId);
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

  const handleSort = (columnName: string) => {
    setSortAsc(!sortAsc);

    const newFilteredMovies = filteredMovies.sort((a, b) => {
      const firstItem = (a[columnName as keyof Movie] ||
        a.genre.name) as string;
      const secondItem = (b[columnName as keyof Movie] ||
        b.genre.name) as string;

      if (firstItem < secondItem) return sortAsc ? -1 : 1;
      else if (firstItem > secondItem) return sortAsc ? 1 : -1;
      else return 0;
    });

    setFilteredMovies([...newFilteredMovies]);
    setActiveMovies(getOnePage(filteredMovies, activePage));
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
          onSort={handleSort}
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
