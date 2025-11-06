import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    // Ép toàn cục: chặn mọi click vào <a> có href="/..."
    const handleLinkClick = (e) => {
      const link = e.target.closest("a");
      if (
        link &&
        link.getAttribute("href") &&
        link.getAttribute("href").startsWith("/") &&
        !link.getAttribute("href").includes(".html")
      ) {
        e.preventDefault();
        window.history.pushState({}, "", link.getAttribute("href"));
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return <AppRoutes />;
}

export default App;
