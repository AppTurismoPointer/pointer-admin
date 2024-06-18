import {
  Spots,
  Categories,
  Locations,
  CreateLocation,
  CreateSpot,
  UpdateLocation,
  UpdateSpot,
  Users,
  Companies,
  UpdateCompany,
  CreateCompany,
  UsersAdmin,
  CreateUserAdmin,
  UpdateUserAdmin,
} from "@/pages";

import { DefaultLayout } from "@/pages/layouts";
import PrivateRoute from "./PrivateRoute";
import { States } from "@/pages/States";
import { Cities } from "@/pages/Cities";

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
          title: () => "Locais Populares",
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
        element: <States />,
        handle: {
          title: () => "Pontos",
        },
      },
      {
        path: "spots/:stateId",
        element: <Cities />,
        handle: {
          title: () => "Pontos",
        },
      },
      {
        path: "spots/:stateId/:cityId",
        element: <Spots />,
        handle: {
          title: () => "Pontos",
        },
      },
      {
        path: "spots/:stateId",
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
      {
        path: "companies",
        element: <Companies />,
        handle: {
          title: () => "Empresas",
        },
      },
      {
        path: "companies/add",
        element: <CreateCompany />,
        handle: {
          title: () => "Cadastrar empresa",
          goBack: "companies",
        },
      },
      {
        path: "companies/:id",
        element: <UpdateCompany />,
        handle: {
          title: () => "Atualizar empresa",
          goBack: "companies",
        },
      },
      {
        path: "admin",
        element: <UsersAdmin />,
        handle: {
          title: () => "Usuários Admnistrativos",
        },
      },
      {
        path: "admin/add",
        element: <CreateUserAdmin />,
        handle: {
          title: () => "Cadastrar usuário admin",
          goBack: "admin",
        },
      },
      {
        path: "admin/:id",
        element: <UpdateUserAdmin />,
        handle: {
          title: () => "Atualizar usuário admin",
          goBack: "admin",
        },
      },
    ],
  },
];
