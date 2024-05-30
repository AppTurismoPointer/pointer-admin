import {
  Spots,
  Categories,
  Locations,
  CreateLocation,
  CreateSpot,
  UpdateLocation,
  UpdateSpot,
  Users,
} from "@/pages";

import { DefaultLayout } from "@/pages/layouts";
import PrivateRoute from "./PrivateRoute";

export const appRoutes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "users",
        element: <Users />,
        handle: {
          title: () => "Usuários",
        },
      },
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
      {
        path: "spots/:id",
        element: <UpdateSpot />,
        handle: {
          title: () => "Atualizar ponto",
          goBack: "spots",
        },
      },
    ],
  },
];