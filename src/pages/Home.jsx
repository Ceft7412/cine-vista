/**
 * components
 */
import Navbar from "../components/Navbar";
import MovieContent from "../components/MovieContent";
import Footer from "../components/Footer";
import { useState } from "react";
import MenuBlock from "../components/MenuBlock";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="root-container">
        <Navbar showSearch={true} bgColor={true} setIsOpen={setIsOpen} isOpen={isOpen} />
        <MovieContent />
        <Footer />
      </div>
      <MenuBlock isOpen={isOpen} />
    </>
  );
}
