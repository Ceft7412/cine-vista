import { useState } from "react";

/**
 * components
 */
import Navbar from "../components/Navbar";
import LandingContent from "../components/LandingContent";
import MenuBlock from "../components/MenuBlock";

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="root-container">
        <Navbar
          showSearch={false}
          bgColor={false}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <LandingContent />
      </div>
      <MenuBlock isOpen={isOpen} />
    </>
  );
}
