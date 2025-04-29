import { Outlet } from "react-router-dom";
import { CoverAuth } from "./CoverAuth";
import logo from "@/assets/logo.svg";

export const AuthLayout = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 h-screen p-4">
      <div className="container relative flex flex-1 flex-col items-center justify-between pt-6">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">
          <img src={logo} alt="Pointer Logo" className="h-9" />
          <Outlet />
        </div>
        <footer className="flex w-full flex-col items-center justify-between gap-4 py-4 md:flex-row">
          <span className="text-xs text-muted-foreground">
            Pointer 2025 © Todos os direitos reservados
          </span>
        </footer>
      </div>
      <CoverAuth />
    </div>
  );
};
