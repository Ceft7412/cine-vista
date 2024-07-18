export default function Navbar() {
  return (
    <>
      <nav className="navbar-top">
        <div className="navbar-top__flex">
          <div className="navbar-top__logo">
            <h1>Logo</h1>
          </div>
          <div className="navbar-top__menu">
            <span className="navbar-top-menu__item" title="Homepage">
              Home
            </span>
            <span className="navbar-top-menu__item" title="Popular Movies">
              Movies
            </span>
            <span className="navbar-top-menu__item" title="PTV Shows">
              TV Shows
            </span>
            <span className="navbar-top-menu__item" title="Top IMDB">
              Top IMDB
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
