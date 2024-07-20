import { useEffect, useState } from "react";

/**
 * components
 */
import Popular from "./Popular";
import Trending from "./Trending";
import Latest from "./Latest";
export default function MovieContent() {
  const [hoveredId, setHoveredId] = useState(null);
  return (
    <>
      <div className="movie-content">
        <div className="movie-content__flex">
          <Popular />
          <Trending />
          <Latest setHoveredId={setHoveredId} hoveredId={hoveredId} />
        </div>
      </div>
    </>
  );
}
