/**
 * components
 */
import Navbar from "../components/Navbar";
import MovieContent from "../components/MovieContent";
export default function Home() {
  return (
    <div className="root-container">
      <Navbar showSearch={true} />
      <MovieContent />
    </div>
  );
}
