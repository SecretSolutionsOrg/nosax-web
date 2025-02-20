import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Container from "../components/Container";
import Home from "./Home";
import Research from "./Research";
import NotFound from "./NotFound";
import Library from "./Library";
import Profile from "./Profile";
import UploadResearch from "./UploadResearch";
import Admin from "./admin/Admin";
import Signin from "../auth/Signin";

const pageRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Container />}>
        <Route index element={<Home />} />
        <Route path="research" element={<Research />} />
        <Route path="upload-research" element={<UploadResearch />} />
        <Route path="library" element={<Library />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin" element={<Admin />} />

      {/* Auth Route */}
      <Route path="/signup" element={<Signin />} />
    </>
  )
);

export default pageRouter;
