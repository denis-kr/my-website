import { Link, useLocation } from "react-router";

import { LakeView } from "~/components/error/arch-window";
import { codeChip, ErrorPage, primaryButton } from "~/components/error/error-page";

// Rendered by the catch-all route, and by the root ErrorBoundary when a loader throws a 404.
export function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <ErrorPage
      scene={<LakeView />}
      status={404}
      heading="There's no page here, just the lake."
      description={
        <>
          Nothing lives at <code className={codeChip}>{pathname}</code>. The
          link may be mistyped, or the page has moved.
        </>
      }
      actions={
        <Link to="/" className={primaryButton}>
          Go to the homepage
        </Link>
      }
    />
  );
}
