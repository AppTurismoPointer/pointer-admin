import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import { appRoutes } from "./app.routes";

const routes = [
  ...authRoutes,
  ...appRoutes,
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
];

const router = createBrowserRouter(routes);

const Provider = () => <RouterProvider router={router} />;

export { Provider as RouterProvider };
