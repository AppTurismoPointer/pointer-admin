import {
  LayoutGrid,
  LocateFixed,
  LucideProps,
  MapPin,
  Users,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import React from "react";

export function Sidebar() {
  const active = window.location.pathname;

  return (
    <div className="pb-12 h-screen min-w-72 w-72 bg-primary">
      <div className="px-8 py-6 border-sb border-secondarys/30">
        <img src={logo} alt="Pointer Logo" className="h-[30px]" />
      </div>
      <div className="space-y-2 pl-6 mt-8 pb-4">
        {[
          { path: "/categories", label: "Categorias", icon: LayoutGrid },
          { path: "/locations", label: "Localizações", icon: LocateFixed },
          { path: "/spots", label: "Pontos", icon: MapPin },
          { path: "/users", label: "Usuários", icon: Users },
        ].map((item) => (
          <NavLink key={item.path} active={active} {...item} />
        ))}
      </div>
    </div>
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
         path === active
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
