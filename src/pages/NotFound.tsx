import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEO page="not_found" />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-heading font-normal text-foreground">404</h1>
        <p className="mb-4 text-sm text-white/85 font-body font-light">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/70 font-body text-sm">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
