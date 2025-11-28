import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChairLoader from "../../components/ChairLoader/ChairLoader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    < >
      {/* Loader overlay */}
      {loading && (
        <div className="overlay" style={{background:'black'}}>
          <ChairLoader />
        </div>
      )}

      {/* These should never fade */}
      <Header />

      {/* Only the page content fades */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease"
        }}
      >
        {children}
      </div>

      <Footer />
    </>
  );
}