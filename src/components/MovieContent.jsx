import { useEffect, useState } from "react";

/**
 * components
 */
import Popular from "./Popular";
export default function MovieContent() {


  return (
    <>
      <div className="movie-content">
        <div className="movie-content__flex">
          <Popular />
          <div className="trending__block"></div>
          <div className="latest-movies__block"></div>
        </div>
      </div>
    </>
  );
}
