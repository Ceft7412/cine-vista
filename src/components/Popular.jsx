import { useEffect, useState, useRef } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
export default function Popular() {
  const popularRef = useRef();
  const [popularMovies, setPopularMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  console.log(popularMovies);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API}`
    )
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  const scroll = (scrollTo) => {
    popularRef.current.scrollLeft += scrollTo;
  };
  return (
    <>
      <div className="popular__block">
        <div className="popular__flex" ref={popularRef}>
          {popularMovies.map((movie) => (
            <div key={movie.id} className="popular__item">
              <div
                className="popular__image-container"
                onMouseEnter={() => setHoveredMovieId(movie.id)}
                onMouseLeave={() => setHoveredMovieId(null)}
                title={movie.title}
              >
                <img
                  className="popular__image"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                {hoveredMovieId === movie.id && (
                  <div className="popular__icon-play-container">
                    <PlayCircleFilledRoundedIcon style={{ fontSize: 60 }} />
                  </div>
                )}
              </div>
              <div className="popular_info-container">
                <span className="popular__title">{movie.title}</span>
                <div className="popular__date-duration-container">
                  <span className="popular__date">
                    {movie.release_date.substring(0, 4)}
                  </span>
                  <span className="popular__duration">
                    {Math.floor(Math.random() * 120) + 60} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll(500)}>Click next</button>
        <button onClick={() => scroll(-500)}>Click prev</button>
      </div>
    </>
  );
}
