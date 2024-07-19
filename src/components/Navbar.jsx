import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
export default function Navbar({ showSearch }) {
  return (
    <>
      <nav className="navbar-top">
        <div className="navbar-top__flex">
          <div className="navbar-top__logo">
            <h1>CineVista</h1>
          </div>
          <div className="navbar-top__menu">
            <span className="navbar-top-menu__item" title="Homepage">
              Home
            </span>
            <span className="navbar-top-menu__item" title="Popular Movies">
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
    </>
  );
}
