import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import { StormView } from "~/components/error/arch-window";
import {
  ErrorPage,
  primaryButton,
  secondaryButton,
} from "~/components/error/error-page";
import { NotFoundPage } from "~/components/error/not-found-page";
import { OWNER } from "~/components/owner";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Anything thrown while loading or rendering a page lands here. Unknown URLs normally reach the
// catch-all route instead, but a loader can still throw a 404, so that gets the same page.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { pathname, search } = useLocation();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <title>{`Page not found · ${OWNER.name}`}</title>
        <NotFoundPage />
      </>
    );
  }

  const status = isRouteErrorResponse(error) ? error.status : 500;
  // Only show the underlying message and stack in development; in production they may leak internals.
  const devError =
    import.meta.env.DEV && error instanceof Error ? error : undefined;

  return (
    <>
      <title>{`Something went wrong · ${OWNER.name}`}</title>
      <ErrorPage
        scene={<StormView />}
        status={status}
        heading="Something broke on my side."
        description="This page hit an error while loading. It isn't anything you did. Try again in a moment, or head back to the homepage."
        actions={
          <>
            {/* A full reload, so it works even if the error stopped the app from hydrating. */}
            <a href={pathname + search} className={primaryButton}>
              Try again
            </a>
            <Link to="/" className={secondaryButton}>
              Go to the homepage
            </Link>
          </>
        }
      >
        {devError && (
          <details className="glass w-full max-w-3xl rounded-2xl p-4 text-left">
            <summary className="cursor-pointer font-semibold">
              {devError.message}
            </summary>
            <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed">
              <code>{devError.stack}</code>
            </pre>
          </details>
        )}
      </ErrorPage>
    </>
  );
}
