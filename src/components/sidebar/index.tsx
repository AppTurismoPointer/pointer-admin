import {
  Building2,
  LayoutGrid,
  LocateFixed,
  LogOut,
  LucideProps,
  MapPin,
  SquareUser,
  UserCog,
  Users,
} from "lucide-react";
import logo from "@/assets/logo-white.svg";
import { Link } from "react-router-dom";
import React from "react";

export function Sidebar() {
  const active = window.location.pathname;

  return (
    <nav className="sm:flex hidden pb-12 h-screen min-w-72 w-72 bg-primary flex-col justify-between">
      <div>
        <div className="px-8 py-6 border-sb border-secondarys/30">
          <img src={logo} alt="Pointer Logo" className="h-[30px]" />
        </div>
        <div className="space-y-2 pl-6 mt-8 pb-4">
          {[
            { path: "/categories", label: "Categorias", icon: LayoutGrid },
            {
              path: "/locations",
              label: "Locais Populares",
              icon: LocateFixed,
            },
            {
              path: "/spots",
              label: "Serviços / Estabelecimentos",
              icon: MapPin,
            },
            { path: "/companies", label: "Empresas", icon: Building2 },
            { path: "/users", label: "Usuários", icon: Users },
            { path: "/admin", label: "Usuários Admin", icon: SquareUser },
            { path: "/managers", label: "Usuários Empresa", icon: UserCog },
            { path: "/states", label: "Estados", icon: Building2 },
          ].map((item) => (
            <NavLink key={item.path} active={active} {...item} />
          ))}
        </div>
      </div>

      <div className="px-8">
        <Link
          className={`inline-flex items-center justify-start whitespace-nowrap text-md
      font-medium ring-offset-background transition-colors focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50 w-full rounded-md px-3 py-3
      bg-primary text-primary-foreground hover:bg-secondary/60`}
          to="/logout"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Link>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  path: string;
  active: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const NavLink = ({ path, active, label, icon: Icon }: NavLinkProps) => {
  return (
    <Link
      className={`inline-flex items-center justify-start whitespace-nowrap text-md
      font-medium ring-offset-background transition-colors focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50 w-full rounded-s-md px-3 py-3
       ${
         active.includes(path)
           ? "bg-secondary text-primary-foreground"
           : "bg-primary text-primary-foreground hover:bg-secondary/60"
       } `}
      to={path}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
};
