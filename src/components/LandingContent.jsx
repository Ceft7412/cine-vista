import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router";

import { SearchContext } from "../App";

export default function LandingContent() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  console.log(searchTerm);
  const toHomepage = () => {
    navigate("home");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };
  return (
    <>
      <div className="landing-background" />
      <div className="landing-content">
        <div className="landing-content__flex">
          <div className="landing-content__item" title="Search a movie, tv show and more">
            <div className="landing-content__icon-wrapper" onClick={handleSearchSubmit}>
              <SearchRoundedIcon style={{ fontSize: 30 }} />
            </div>
            <form ref={formRef} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="landing-content__input"
                placeholder="Find movie, tv show and more"
                onChange={handleSearchChange}
              />
            </form>
          </div>
          <div
            className="landing-content__item button-redirect-landing"
            onClick={toHomepage}
            title="Homepage"
          >
            <span>View More</span>
            <div className="landing-content__icon-arrow-wrapper">
              <ArrowForwardRoundedIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
