import { Outlet } from "react-router-dom";
import logo from "@/assets/logo.svg";

export const AuthLayout = () => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 h-screen">
      <div className="sm:flex hidden p-24 justify-center flex-col gap-4 bg-primary">
        <img src={logo} className="w-[280px]" />
        <h1 className="text-white font-medium text-lg max-w-[500px]">
          Bússola de Experiências
        </h1>
      </div>

      <div className="flex items-center justify-center sm:p-20 p-10">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
