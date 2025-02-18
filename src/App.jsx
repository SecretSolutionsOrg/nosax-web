import { RouterProvider } from "react-router-dom";
import pageRouter from "./pages/pageRouter";

const App = () => {
  return <RouterProvider router={pageRouter} />;
};

export default App;
