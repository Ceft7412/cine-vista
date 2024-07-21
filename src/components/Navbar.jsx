import { useState, useEffect, useContext, useRef } from "react";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { SearchContext } from "../App";
export default function Navbar({ showSearch, bgColor, setIsOpen, isOpen }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toPage = (page) => {
    navigate(`/${page}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
  };
  return (
    <>
      <div
        className={`navbar ${showNavbar ? "show" : "hide"} ${
          bgColor ? "bg-color" : "extra-marg"
        } ${isOpen ? "padding-nav" : ""}`}
      >
        <nav className="navbar-top">
          <div className={`navbar-top__flex ${isOpen ? "padding-flex" : ""}`}>
            <div className="navbar-top__logo">
              <div className="navbar-top__menu-icon" onClick={() => setIsOpen(!isOpen)}>
                <MenuRoundedIcon />
              </div>
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
              <span
                className="navbar-top-menu__item"
                title="TV Shows"
                onClick={() => toPage("tvshows")}
              >
                TV Shows
              </span>

              {showSearch && (
                <>
                  <div className="navbar-top-menu__search-container">
                    <div
                      className="navbar-top-menu__icon-wrapper"
                      onClick={handleSearchSubmit}
                    >
                      <SearchRoundedIcon style={{ fontSize: 30 }} />
                    </div>
                    <form ref={formRef} onSubmit={handleSearchSubmit}>
                      <input
                        type="text"
                        className="navbar-top-menu__input"
                        onChange={handleSearchChange}
                        placeholder="Search..."
                      />
                    </form>
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
