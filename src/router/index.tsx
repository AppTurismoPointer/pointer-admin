import { DefaultLayout } from "@/pages/layouts";
import {
  Spots,
  Categories,
  Locations,
  CreateLocation,
  CreateSpot,
  UpdateLocation,
} from "@/pages";
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
        path: "locations",
        element: <Locations />,
        handle: {
          title: () => "Localizações",
        },
      },
      {
        path: "locations/add",
        element: <CreateLocation />,
        handle: {
          title: () => "Cadastrar localização",
          goBack: "locations",
        },
      },
      {
        path: "locations/:id",
        element: <UpdateLocation />,
        handle: {
          title: () => "Atualizar localização",
          goBack: "locations",
        },
      },
      {
        path: "spots",
        element: <Spots />,
        handle: {
          title: () => "Pontos",
        },
      },
      {
        path: "spots/add",
        element: <CreateSpot />,
        handle: {
          title: () => "Cadastrar ponto",
          goBack: "spots",
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Provider = () => <RouterProvider router={router} />;

export { Provider as RouterProvider };
