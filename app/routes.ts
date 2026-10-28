import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("ai", "routes/ai.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
