import { useEffect, useState } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";

/**
 * Components
 */
import Navbar from "../components/Navbar";

export default function Movies() {
  const [hoveredId, setHoveredId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    if (pageNumber > startPage + 2) {
      setStartPage(pageNumber - 2);
    } else if (pageNumber < startPage) {
      setStartPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = startPage; i <= Math.min(startPage + 2, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="root-container">
        <Navbar showSearch={true} />
        <div className="movies-block">
          <div className="movies__flex">
            <div className="movies__header">
              <h1 className="movies__title">Movies</h1>
            </div>
            <div className="movies__content">
              {movies.map((movie) => (
                <div key={movie.id} className="movies__item">
                  <div
                    className="movies__image-container"
                    title={movie.title}
                    onMouseEnter={() => setHoveredId(movie.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <img
                      className="movies__image"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    {hoveredId === movie.id && (
                      <div className="movies__icon-play-container">
                        <PlayCircleFilledRoundedIcon style={{ fontSize: 60 }} />
                      </div>
                    )}
                  </div>
                  <div className="movies__info-container">
                    <span className="movies__title">{movie.title}</span>
                    <div className="movies__date-duration-container">
                      <span className="movies__date">
                        {movie.release_date.substring(0, 4)}
                      </span>
                      <span className="movies__duration">{movie.minutes} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              {pageNumbers.map((number) => (
                <button key={number} onClick={() => handlePageChange(number)}>
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
