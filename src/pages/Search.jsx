import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import Navbar from "../components/Navbar";

export default function Search() {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [showOther, isShowOther] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API}&query=${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) =>
          data.results.map((result) => ({
            ...result,
            type: "movie",
            runtime: Math.floor(Math.random() * 180) + 90,
          }))
        ),
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_API}&query=${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) =>
          data.results.map((result) => ({
            ...result,
            type: "tv",
            episodes: Math.floor(Math.random() * 100) + 1,
            seasons: Math.floor(Math.random() * 10) + 1,
          }))
        ),
    ]).then(([movies, shows]) => setResults([...movies, ...shows]));
  }, [searchTerm]);
  return (
    <>
      <div className="root-container">
        <Navbar showSearch={true} bgColor={true} />
        <div className="movie-content" style={{ marginTop: "50px" }}>
          <div className="movie-content__flex">
            <div className="trending-block">
              <div className="trending__flex">
                <div className="trending__header">
                  <h1 className="trending__title">Search results for {searchTerm}:</h1>
                </div>
                <div className="trending__content">
                  {results.map((result) => (
                    <div key={result.id} className="content__item">
                      <div
                        className="trending__image-container"
                        title={result.title || result.name}
                        onMouseEnter={() => setHoveredId(result.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <img
                          className="trending__image"
                          src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                          alt={result.title || result.name}
                        />
                        {hoveredId === result.id && (
                          <div className="trending__icon-play-container">
                            <PlayCircleFilledRoundedIcon style={{ fontSize: 60 }} />
                          </div>
                        )}
                      </div>
                      <div className="trending__info-container">
                        <span className="trending__title">
                          {result.title || result.name}
                        </span>
                        <div className="trending__date-duration-container">
                          <span className="trending__date">
                            {(
                              result.release_date ||
                              result.first_air_date ||
                              ""
                            ).substring(0, 4)}
                            {result.type === "tv" ? ` | ${result.seasons} seasons` : ""}
                          </span>
                          <span className="trending__duration">
                            {result.type === "movie"
                              ? `${result.runtime} min`
                              : `${result.episodes} episodes`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
