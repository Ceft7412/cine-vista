import { useEffect, useState } from "react";

/**
 * components
 */
import Popular from "./Popular";
import Trending from "./Trending";
export default function MovieContent() {
  return (
    <>
      <div className="movie-content">
        <div className="movie-content__flex">
          <Popular />
          <Trending />
          <div className="latest-movies__block"></div>
        </div>
      </div>
    </>
  );
}
