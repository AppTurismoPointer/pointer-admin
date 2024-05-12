import { LayoutGrid, MapPin, Users } from "lucide-react";
import { Button } from "../ui/button";
import logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const active = window.location.pathname;
  const navigate = useNavigate();

  return (
    <div className="pb-12 h-screen min-w-72 w-72 border">
      <div className="px-6 py-4">
        <img src={logo} alt="Pointer Logo" />
      </div>
      <div>
        <div className="space-y-1 px-4 mt-4 pb-4 border-b">
          {[
            { path: "/categories", label: "Categorias", icon: LayoutGrid },
            { path: "/locations", label: "Localizações", icon: MapPin },
          ].map(({ path, label, icon: Icon }) => (
            <Button
              key={path}
              variant={path === active ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(path)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
        <div className="space-y-1 px-4 mt-4 pb-4">
          {[{ path: "/users", label: "Usuários", icon: Users }].map(
            ({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={path === active ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => navigate(path)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
