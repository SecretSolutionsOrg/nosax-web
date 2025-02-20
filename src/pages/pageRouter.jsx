import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Home from "./Home";
import Research from "./Research";
import NotFound from "./NotFound";
import Library from "./Library";
import Profile from "./Profile";
import UploadResearch from "./UploadResearch";
import Admin from "./admin/Admin";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AdminLayout from "../components/admin/AdminLayout";

const pageRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="research" element={<Research />} />
        <Route path="upload-research" element={<UploadResearch />} />
        <Route path="library" element={<Library />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />
      </Route>

      {/* Auth Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

export default pageRouter;
