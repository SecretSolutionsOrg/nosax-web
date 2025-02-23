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
import SearchResult from "./SearchResult";
import ProtectedAuth from "../auth/middleware/protectedAuth";
import ProtectedAdmin from "../auth/middleware/protectedAdmin";
import ProtectedRoutes from "../auth/middleware/protectedRoutes";

const pageRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <MainLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Home />} />
        <Route path="research" element={<Research />} />
        <Route path="upload-research" element={<UploadResearch />} />
        <Route path="library" element={<Library />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<SearchResult />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        <Route index element={<Admin />} />
      </Route>

      {/* Auth Route */}
      <Route
        path="/login"
        element={
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        }
      />
    </>
  )
);

export default pageRouter;
