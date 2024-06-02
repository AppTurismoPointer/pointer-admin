import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  if (authenticated) return children;

  return <Navigate to="/" />;
};

export default PrivateRoute;
