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
  States,
  Cities,
} from "@/pages";

import { DefaultLayout } from "@/pages/layouts";
import PrivateRoute from "./PrivateRoute";

const spotsRoutes = [
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
];

const locationsRoutes = [
  {
    path: "locations",
    element: <States />,
    handle: {
      title: () => "Locais Populares",
    },
  },
  {
    path: "locations/:stateId",
    element: <Cities />,
    handle: {
      title: () => "Locais Populares",
    },
  },
  {
    path: "locations/:stateId/:cityId",
    element: <Locations />,
    handle: {
      title: () => "Locais Populares",
    },
  },
  {
    path: "locations/add",
    element: <CreateLocation />,
    handle: {
      title: () => "Cadastrar local popular",
      goBack: "locations",
    },
  },
  {
    path: "locations/:id",
    element: <UpdateLocation />,
    handle: {
      title: () => "Atualizar local popular",
      goBack: "locations",
    },
  },
];

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
      ...locationsRoutes,
      ...spotsRoutes,
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
      {
        path: "states",
        element: <States />,
        handle: {
          title: () => "Estados",
        },
      },
      {
        path: "states/:stateId",
        element: <Cities />,
        handle: {
          title: () => "Cidades",
        },
      },
    ],
  },
];
