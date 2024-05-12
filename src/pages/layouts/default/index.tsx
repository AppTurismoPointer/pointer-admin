import { Outlet, useMatches } from "react-router-dom";

import { Sidebar } from "@/components";

type MatchProps = Omit<ReturnType<typeof useMatches>[number], "handle"> & {
  handle: {
    title: () => string;
    crumb: () => string;
  };
};

export const DefaultLayout = () => {
  const pathname = window.location.pathname;
  const matches = useMatches() as MatchProps[];

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => {
      return {
        title: match.handle.title(),
        crumb: match.handle.crumb(),
        pathname: match.pathname,
      };
    });

  const pageTitle =
    crumbs.find((crumb) => crumb.pathname === pathname)?.title || "";

  return (
    <main className="flex">
      <Sidebar />
      <div className="px-4 py-6 w-full">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">
          {pageTitle}
        </h1>
        <Outlet />
      </div>
    </main>
  );
};
