import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { createContext, useContext, useState } from "react";
/**
 * Pages of the app
 */

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Search from "./pages/Search";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="home" element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="tvshows" element={<TvShows />} />
      <Route path="search/:searchTerm" element={<Search />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </>
  );
}

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        {children}
      </SearchContext.Provider>
    </>
  );
}

export default App;
