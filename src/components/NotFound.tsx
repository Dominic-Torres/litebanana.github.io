import { useEffect, useState } from "react";
import { Mascot } from "./Character";
import { ArrowLeftIcon } from "./Icons";

export default function NotFound() {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    // Capture any stored redirect from 404.html
    try {
      const redirect = sessionStorage.redirect;
      if (redirect) {
        setRedirectPath(redirect);
        sessionStorage.removeItem("redirect");
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  function goHome() {
    window.location.href = "/";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <Mascot pose="thinking" className="w-48 sm:w-56" />
      <h1 className="mt-8 font-display text-6xl font-bold text-ink dark:text-white">
        404
      </h1>
      <p className="mt-2 font-display text-2xl font-bold text-ink dark:text-white">
        Lost in the backrooms?
      </p>
      <p className="mt-3 max-w-md text-sm font-medium text-ink-faint dark:text-slate-400">
        {redirectPath
          ? `The page "${redirectPath}" doesn't exist.`
          : "The page you're looking for doesn't exist or has been moved."}
      </p>
      <button
        type="button"
        onClick={goHome}
        className="btn-primary mt-8"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        GO HOME
      </button>
    </div>
  );
}
