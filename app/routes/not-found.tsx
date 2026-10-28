import { data } from "react-router";

import { NotFoundPage } from "~/components/error/not-found-page";
import { OWNER } from "~/components/owner";
import type { Route } from "./+types/not-found";

export function loader() {
  return data(null, { status: 404 });
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Page not found · ${OWNER.name}` },
    { name: "robots", content: "noindex" },
  ];
}

export default function NotFound() {
  return <NotFoundPage />;
}
