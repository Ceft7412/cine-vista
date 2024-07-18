import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useNavigate } from "react-router";
export default function LandingContent() {
  const navigate = useNavigate();

  const toHomepage = () => {
    navigate("home");
  };
  return (
    <>
      <div className="landing-background" />
      <div className="landing-content">
        <div className="landing-content__flex">
          <div className="landing-content__item" title="Search a movie, tv show and more">
            <div className="landing-content__icon-wrapper">
              <SearchRoundedIcon style={{ fontSize: 30 }} />
            </div>
            <input
              type="text"
              className="landing-content__input"
              placeholder="Find movie, tv show and more"
            />
          </div>
          <div
            className="landing-content__item button-redirect-landing"
            onClick={toHomepage}
            title="Homepage"
          >
            <span>View</span>
            <div className="landing-content__icon-arrow-wrapper">
              <ArrowForwardRoundedIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
