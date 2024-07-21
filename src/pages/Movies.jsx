import { useEffect, useState } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

/**
 * Components
 */
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import MenuBlock from "../components/MenuBlock";
export default function Movies() {
  const [hoveredId, setHoveredId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalName, setModalName] = useState("");



  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=38785ed2e2429a4e78f7de717e7e6f78`
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }, []);

  useEffect(() => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=38785ed2e2429a4e78f7de717e7e6f78&page=${page}`;
    if (selectedGenre.length > 0) {
      url += `&with_genres=${selectedGenre.join(",")}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const movies = [...data.results];
        const moviesMinutes = movies.map((movie) => ({
          ...movie,
          minutes: Math.floor(Math.random() * 120) + 60,
        }));
        setMovies(moviesMinutes);
        setTotalPages(data.total_pages);
      });
  }, [page, selectedGenre]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    if (pageNumber > startPage + 2) {
      setStartPage(pageNumber - 2);
    } else if (pageNumber < startPage) {
      setStartPage(pageNumber);
    }
  };

  /**
   * Page numbers array holds the number to be shown
   * Using math min will get the lowest number, in case the total pages is exhausted.
   */
  const pageNumbers = [];

  for (let i = startPage; i <= Math.min(startPage + 4, totalPages); i++) {
    pageNumbers.push(i);
  }

  const handleArrowClick = () => {
    setStartPage((prevStartPage) => Math.min(prevStartPage + 5, totalPages - 4));
  };

  const handlePrevClick = () => {
    setStartPage((prevStartPage) => Math.max(prevStartPage - 5, 1));
  };

  const handleClickFilter = (modalName) => {
    setModalName(modalName);
    setModal(!modal);
  };

  const modalVariant = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        // type: "spring",
        // stiffness: 120,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.1,
      },
    },
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre((prevSelectedGenre) => {
      if (prevSelectedGenre.includes(genreId)) {
        return prevSelectedGenre.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenre, genreId];
      }
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="root-container">
        <Navbar showSearch={true} bgColor={true} setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className="movies-block">
          <div className="movies__flex">
            <div className="movies__header">
              <h1 className="movies__title">Movies</h1>
              <div className="filter">
                <div className="filter__item">
                  <span
                    className="filter__icon"
                    onClick={() => handleClickFilter("Genre")}
                  >
                    Genre <KeyboardArrowDownRoundedIcon />
                  </span>

                  <AnimatePresence>
                    {modal && modalName === "Genre" && (
                      <motion.div
                        className="modal-movies genre"
                        variants={modalVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="modal-movies__flex">
                          <div className="modal-movies__header">
                            <span>Genre</span>
                            {selectedGenre.length > 0 && (
                              <span
                                className="modal-movies__clear"
                                onClick={() => setSelectedGenre([])}
                              >
                                <HighlightOffRoundedIcon />
                                Clear
                              </span>
                            )}
                          </div>
                          <div className="modal-movies__content">
                            {genres.map((genre) => (
                              <div
                                className="movies-content__item"
                                key={genre.id}
                                onClick={() => handleGenreSelect(genre.id)}
                              >
                                <div className="genre__item">
                                  <span>{genre.name}</span>
                                  {selectedGenre.includes(genre.id) && (
                                    <div className="genre__check">
                                      <CheckRoundedIcon />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className="filter__item"
                  onClick={() => handleClickFilter("Release Year")}
                >
                  <span>Release Year</span>
                  <KeyboardArrowDownRoundedIcon />
                  <AnimatePresence>
                    {modal && modalName === "Release Year" && (
                      <motion.div
                        className="modal-movies release-year"
                        variants={modalVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="modal-movies__flex">
                          <div className="modal-movies__header"></div>
                          <div className="modal-movies__content"></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="movies__content">
              {movies.length > 0 ? (
                movies.map((movie) => (
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
                ))
              ) : (
                <div>No movies found for the selected genres.</div>
              )}
            </div>
            <div className="movies__pagination">
              <div className="movies__button  clicks" onClick={handlePrevClick}>
                <ArrowBackIosNewRoundedIcon />
              </div>
              {pageNumbers.map((number) => (
                <button
                  className={`movies__button ${page === number ? "active" : ""}`}
                  key={number}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}
              <div className="movies__button clicks" onClick={handleArrowClick}>
                <ArrowForwardIosRoundedIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MenuBlock isOpen={isOpen} />
    </>
  );
}
