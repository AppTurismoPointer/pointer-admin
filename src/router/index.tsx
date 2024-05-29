import { DefaultLayout } from "@/pages/layouts";
import { Spots, Categories, CreateCategory, Locations } from "@/pages";
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
        },
      },
      {
        path: "categories/add",
        element: <CreateCategory />,
        handle: {
          title: () => "Cadastrar categoria",
          goBack: "categories",
        },
      },
      {
        path: "locations",
        element: <Locations />,
        handle: {
          title: () => "Localizações",
        },
      },
      {
        path: "spots",
        element: <Spots />,
        handle: {
          title: () => "Pontos",
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Provider = () => <RouterProvider router={router} />;

export { Provider as RouterProvider };
