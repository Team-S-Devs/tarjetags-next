import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../src/utils/firebase-config";
import "../src/assets/styles/loader.css";
import { SITE_NAME } from "../src/utils/constants";
import { useRouter } from "next/router";
import Head from "next/head";

const Splash = ({ navigateTo = "/login", loggedNavigateTo = "/dashboard" }) => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthStateChange = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push(loggedNavigateTo);
        } else {
          router.push(navigateTo);
        }
      });
    };

    handleAuthStateChange();
  }, []);

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Head>
        <title>{`${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      <span className="loader"></span>
    </div>
  );
};

export default Splash;
