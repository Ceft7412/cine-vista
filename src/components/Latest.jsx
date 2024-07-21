import { useState, useEffect } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";

export default function Latest({ setHoveredId, hoveredId }) {
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestShows, setLatestShows] = useState([]);

  const [showOther, isShowOther] = useState(false);


  useEffect(() => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    date.setMonth(date.getMonth() - 1);
    const oneMonthAgo = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=38785ed2e2429a4e78f7de717e7e6f78&primary_release_date.gte=${oneMonthAgo}&primary_release_date.lte=${currentDate}&page=1`
      ).then((response) => response.json()),
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=38785ed2e2429a4e78f7de717e7e6f78&primary_release_date.gte=${oneMonthAgo}&primary_release_date.lte=${currentDate}&page=2`
      ).then((response) => response.json()),
    ]).then(([data1, data2]) => {
      const movies = [...data1.results, ...data2.results];

      const moviesMinutes = movies.map((movie) => ({
        ...movie,
        minutes: Math.floor(Math.random() * 120) + 60,
      }));
      setLatestMovies(moviesMinutes);
    });
  }, []);

  useEffect(() => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    date.setMonth(date.getMonth() - 1);
    const oneMonthAgo = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    /**
     * Fetch two endpoints at the same time
     * Promise only returns a new promise that only resolves when the promise
     * contained in the array have been resolved.
     */
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=38785ed2e2429a4e78f7de717e7e6f78&first_air_date.gte=${oneMonthAgo}&first_air_date.lte=${currentDate}&page=1`
      ).then((response) => response.json()),
      fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=38785ed2e2429a4e78f7de717e7e6f78&first_air_date.gte=${oneMonthAgo}&first_air_date.lte=${currentDate}&page=2`
      ).then((response) => response.json()),
    ]).then(([data1, data2]) => {
      const movies = [...data1.results, ...data2.results];
      const moviesInfo = movies.map((movie) => ({
        ...movie,
        eps: Math.floor(Math.random() * 10) + 1,
        ss: Math.floor(Math.random() * 7) + 1,
      }));
      setLatestShows(moviesInfo);
    });
  }, []);

  return (
    <>
      <div className="latest-block">
        <div className="latest__flex">
          <div className="latest__header">
            <h1 className="latest__title">Latest</h1>
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
          <div className="latest__content">
            {showOther
              ? latestShows.map((latestTvShow) => (
                  <div key={latestTvShow.id} className="latest-content__item">
                    <div
                      className="latest__image-container"
                      title={latestTvShow.name}
                      onMouseEnter={() => setHoveredId(latestTvShow.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <img
                        className="latest__image"
                        src={`https://image.tmdb.org/t/p/w500/${latestTvShow.poster_path}`}
                        alt={latestTvShow.name}
                      />

                      {hoveredId === latestTvShow.id && (
                        <div className="latest__icon-play-container">
                          <PlayCircleFilledRoundedIcon style={{ fontSize: 60 }} />
                        </div>
                      )}
                    </div>
                    <div className="latest__info-container">
                      <span className="latest__title">{latestTvShow.name}</span>
                      <div className="latest__date-duration-container">
                        <span className="latest__date">
                          {latestTvShow.first_air_date.substring(0, 4)} SS
                          {latestTvShow.ss}
                        </span>
                        <span className="latest__duration">EPS {latestTvShow.eps}</span>
                      </div>
                    </div>
                  </div>
                ))
              : latestMovies.map((latestMovie) => (
                  <div key={latestMovie.id} className="latest-content__item">
                    <div
                      className="latest__image-container"
                      title={latestMovie.title}
                      onMouseEnter={() => setHoveredId(latestMovie.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <img
                        className="latest__image"
                        src={`https://image.tmdb.org/t/p/w500/${latestMovie.poster_path}`}
                        alt={latestMovie.title}
                      />
                      {hoveredId === latestMovie.id && (
                        <div className="latest__icon-play-container">
                          <PlayCircleFilledRoundedIcon style={{ fontSize: 60 }} />
                        </div>
                      )}
                    </div>
                    <div className="latest__info-container">
                      <span className="latest__title">{latestMovie.title}</span>
                      <div className="latest__date-duration-container">
                        <span className="latest__date">
                          {latestMovie.release_date.substring(0, 4)}
                        </span>
                        <span className="latest__duration">
                          {latestMovie.minutes} min
                        </span>
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
