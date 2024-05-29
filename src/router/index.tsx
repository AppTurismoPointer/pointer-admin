import { DefaultLayout } from "@/pages/layouts";
import { Spots, Categories, Locations } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "categories",
        element: <Categories />,
        handle: {
          title: () => "Categorias",
          crumb: () => "Categorias",
        },
      },
      {
        path: "locations",
        element: <Locations />,
        handle: {
          title: () => "Localizações",
          crumb: () => "Localizações",
        },
      },
      {
        path: "spots",
        element: <Spots />,
        handle: {
          title: () => "Localizações",
          crumb: () => "Localizações",
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Provider = () => <RouterProvider router={router} />;

export { Provider as RouterProvider };
