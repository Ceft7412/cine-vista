import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

/**
 * Pages of the app
 */

import Landing from "./pages/Landing";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements( 
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="home" element={<Home />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
