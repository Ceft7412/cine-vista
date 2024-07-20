/**
 * Hooks
 */
import { useEffect, useState } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";

export default function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [showOther, isShowOther] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  console.log(trendingShows);
  useEffect(() => {
    /**
     * Fetch two endpoints at the same time
     * Promise only returns a new promise that only resolves when the promise
     * contained in the array have been resolved.
     */
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_MOVIEDB_API}&page=1`
      ).then((response) => response.json()),
      fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_MOVIEDB_API}&page=2`
      ).then((response) => response.json()),
    ]).then(([data1, data2]) => {
      const movies = [...data1.results, ...data2.results].slice(0, 30);
      const moviesWithMinutes = movies.map((movie) => ({
        ...movie,
        minutes: Math.floor(Math.random() * 120) + 60,
      }));
      setTrendingMovies(moviesWithMinutes);
    });
  }, []);

  useEffect(() => {
    /**
     * Fetch two endpoints at the same time
     * Promise only returns a new promise that only resolves when the promise
     * contained in the array have been resolved.
     */
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_MOVIEDB_API}&page=1`
      ).then((response) => response.json()),
      fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_MOVIEDB_API}&page=2`
      ).then((response) => response.json()),
    ]).then(([data1, data2]) => {
      const movies = [...data1.results, ...data2.results];
      const moviesInfo = movies.map((movie) => ({
        ...movie,
        eps: Math.floor(Math.random() * 10) + 1,
        ss: Math.floor(Math.random() * 7) + 1,
      }));
      setTrendingShows(moviesInfo);
    });
  }, []);

  return (
    <>
      <div className="trending-block">
        <div className="trending__flex">
          <div className="trending__header">
            <h1 className="trending__title">Trending</h1>
            <div className="movies-shows">
              <span
                className={`movies-shows__item ${!showOther ? "active" : ""}`}
                onClick={() => isShowOther(false)}
              >
                Movies
              </span>
              <span
                className={`movies-shows__item ${showOther ? "active" : ""}`}
                onClick={() => isShowOther(true)}
              >
                TV Shows
              </span>
            </div>
          </div>
          <div className="trending__content">
            {showOther
              ? trendingShows.map((tv) => (
                  <div key={tv.id} className="content__item">
                    <div
                      className="trending__image-container"
                      title={tv.name}
                      onMouseEnter={() => setHoveredId(tv.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <img
                        className="trending__image"
                        src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                        alt={tv.name}
                      />

                      {hoveredId === tv.id && (
                        <div className="trending__icon-play-container">
                          <PlayCircleFilledRoundedIcon style={{ fontSize: 60 }} />
                        </div>
                      )}
                    </div>
                    <div className="trending__info-container">
                      <span className="trending__title">{tv.name}</span>
                      <div className="trending__date-duration-container">
                        <span className="trending__date">
                          {tv.first_air_date.substring(0, 4)} SS
                          {tv.ss}
                        </span>
                        <span className="trending__duration">EPS {tv.eps}</span>
                      </div>
                    </div>
                  </div>
                ))
              : trendingMovies.map((movie) => (
                  <div key={movie.id} className="content__item">
                    <div
                      className="trending__image-container"
                      title={movie.title}
                      onMouseEnter={() => setHoveredId(movie.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <img
                        className="trending__image"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                      />
                      {hoveredId === movie.id && (
                        <div className="trending__icon-play-container">
                          <PlayCircleFilledRoundedIcon style={{ fontSize: 60 }} />
                        </div>
                      )}
                    </div>
                    <div className="trending__info-container">
                      <span className="trending__title">{movie.title}</span>
                      <div className="trending__date-duration-container">
                        <span className="trending__date">
                          {movie.release_date.substring(0, 4)}
                        </span>
                        <span className="trending__duration">{movie.minutes} min</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
