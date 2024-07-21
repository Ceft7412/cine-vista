import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { SearchContext } from "../App";
export default function MenuBlock({ isOpen }) {
  const formRef = useRef(null);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();
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
      {isOpen && (
        <div className="menu-block">
          <div className="menu-block__flex">
            <div className="menu-block__item" onClick={() => toPage("home")}>
              <span>Home</span>
            </div>
            <div className="menu-block__item" onClick={() => toPage("movies")}>
              <span>Movies</span>
            </div>
            <div className="menu-block__item" onClick={() => toPage("tvshows")}>
              <span>TV Shows</span>
            </div>
            <div className="menu-block__item__search-container">
              <div
                className="menu-block__item__icon-wrapper"
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
          </div>
        </div>
      )}
    </>
  );
}
