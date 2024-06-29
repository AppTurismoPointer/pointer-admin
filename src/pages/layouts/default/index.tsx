import { Outlet, useMatches, useNavigate } from "react-router-dom";

import { Sidebar } from "@/components";
import { Container } from "./styles";
import { ArrowLeft } from "lucide-react";

type MatchProps = Omit<ReturnType<typeof useMatches>[number], "handle"> & {
  handle: {
    title: () => string;
    goBack: string;
  };
};

export const DefaultLayout = () => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const matches = useMatches() as MatchProps[];

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.title))
    .map((match) => {
      return {
        title: match.handle.title(),
        goBack: match.handle.goBack,
        pathname: match.pathname,
      };
    });

  const active = crumbs.find((crumb) => crumb.pathname === pathname);

  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="flex items-center gap-2 py-4 px-6">
          {active?.goBack ? (
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="text-primary" size={18} />
            </button>
          ) : null}
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            {active?.title}
          </h1>
        </div>
        <Container className="p-6">
          <Outlet />
        </Container>
      </div>
    </main>
  );
};
