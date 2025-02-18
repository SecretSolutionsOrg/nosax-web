import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Home";
import Research from "./Research";
import NotFound from "./NotFound";
import Container from "../components/Container";

const pageRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Container />}>
      <Route index element={<Home />} />
      <Route path="research" element={<Research />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default pageRouter;
