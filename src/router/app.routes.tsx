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
      title: () => "Serviços / Estabelecimentos",
    },
  },
  {
    path: "spots/:stateId",
    element: <Cities />,
    handle: {
      title: () => "Serviços / Estabelecimentos",
      goBack: true,
    },
  },
  {
    path: "spots/:stateId/:cityId",
    element: <Spots />,
    handle: {
      title: () => "Serviços / Estabelecimentos",
      goBack: true,
    },
  },
  {
    path: "spots/:stateId/:cityId/add",
    element: <CreateSpot />,
    handle: {
      title: () => "Cadastrar serviço/estabelecimento",
      goBack: true,
    },
  },
  {
    path: "spots/:stateId/:cityId/:id",
    element: <UpdateSpot />,
    handle: {
      title: () => "Atualizar serviço/estabelecimento",
      goBack: true,
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
      goBack: true,
    },
  },
  {
    path: "locations/:stateId/:cityId",
    element: <Locations />,
    handle: {
      title: () => "Locais Populares",
      goBack: true,
    },
  },
  {
    path: "locations/:stateId/:cityId/add",
    element: <CreateLocation />,
    handle: {
      title: () => "Cadastrar local popular",
      goBack: true,
    },
  },
  {
    path: "locations/:stateId/:cityId/:id",
    element: <UpdateLocation />,
    handle: {
      title: () => "Atualizar local popular",
      goBack: true,
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
          goBack: true,
        },
      },
      {
        path: "companies/:id",
        element: <UpdateCompany />,
        handle: {
          title: () => "Atualizar empresa",
          goBack: true,
        },
      },
      {
        path: "admin",
        element: <UsersAdmin />,
        handle: {
          title: () => "Usuários Admnistrativos",
          goBack: true,
        },
      },
      {
        path: "admin/add",
        element: <CreateUserAdmin />,
        handle: {
          title: () => "Cadastrar usuário admin",
          goBack: true,
        },
      },
      {
        path: "admin/:id",
        element: <UpdateUserAdmin />,
        handle: {
          title: () => "Atualizar usuário admin",
          goBack: true,
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
          goBack: true,
        },
      },
    ],
  },
];
