import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
export default function Navbar({ showSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition === 0) {
        setShowNavbar(true);
      } else {
        setShowNavbar(scrollPosition > currentScrollPosition);
      }
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };  
  }, [scrollPosition]);

  const toPage = (page) => {
    console.log(page);
    navigate(`/${page}`);
  };
  return (
    <>
      <div className={`navbar ${showNavbar ? "show" : "hide"}`}>
        <nav className="navbar-top">
          <div className="navbar-top__flex">
            <div className="navbar-top__logo">
              <h1>CineVista</h1>
            </div>
            <div className="navbar-top__menu">
              <span
                className="navbar-top-menu__item"
                title="Homepage"
                onClick={() => toPage("home")}
              >
                Home
              </span>
              <span
                className="navbar-top-menu__item"
                title="Popular Movies"
                onClick={() => toPage("movies")}
              >
                Movies
              </span>
              <span className="navbar-top-menu__item" title="TV Shows">
                TV Shows
              </span>

              {showSearch && (
                <>
                  <span className="navbar-top-menu__item" title="Top IMDB">
                    Genres
                  </span>

                  <div className="navbar-top-menu__search-container">
                    <div className="navbar-top-menu__icon-wrapper">
                      <SearchRoundedIcon style={{ fontSize: 30 }} />
                    </div>
                    <input
                      type="text"
                      className="navbar-top-menu__input"
                      placeholder="Search..."
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
