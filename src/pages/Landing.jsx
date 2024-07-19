import React from "react";

/**
 * components
 */
import Navbar from "../components/Navbar";
import LandingContent from "../components/LandingContent";

export default function Landing() {
  return (
    <div className="root-container">
      <Navbar showSearch={false} />
      <LandingContent />
    </div>
  );
}
