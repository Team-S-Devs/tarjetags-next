import React, { useEffect, useState } from "react";
import Header from "../../src/sections/Header";
import BoldTitle from "../../src/components/texts/BoldTitle";
import ThinTitle from "../../src/components/texts/ThinTitle";
import ShareCard from "../../src/components/card/ShareCard";
import InfoCard from "../../src/components/card/InfoCard";
import { Button } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import { MAIN_COLOR, SITE_NAME } from "../../src/utils/constants";
import { useRouter } from "next/router";
import Head from "next/head";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/utils/firebase-config";

const CardDetails = () => {
  const router = useRouter();
  const { cardId } = router.query;
  const [urlWithId, setUrlWithId] = useState("");

  const [user, setUser] = useState(null);
  const [loadingGetting, setLoadingGetting] = useState(false);

  useEffect(() => {
    setLoadingGetting(true);
    onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
        setLoadingGetting(false);
      } else {
        router.push("/login");
        setUser(null);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
      } else {
        router.push("/login");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const currentUrl = window.location.origin;
    const urlWithId = `${currentUrl}/${cardId}`;
    setUrlWithId(urlWithId);
  }, []);

  return (
    <>
      {loadingGetting || !cardId ? (
        <div
          style={{
            height: "100vh",
            background: MAIN_COLOR,
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="loader-white"></span>
        </div>
      ) : (
        <div
          className="container d-flex flex-column align-items-end"
          style={{ height: "100vh", paddingBottom: "60px" }}
        >
          <Head>
            <title>{`Detalles ${cardId} - ${SITE_NAME}`}</title>
            <meta
              name="description"
              content="Crea tarjetas de presentación irresistibles que te abran puertas y
              te conecten con oportunidades ilimitadas."
            />
          </Head>
          <Header />
          <div
            style={{ flex: 100, marginTop: 100, width: "100%" }}
            className="d-flex flex-column"
          >
            <div className="d-flex flex-column align-items-start">
              <Button
                startIcon={<FaChevronLeft />}
                style={{ fontSize: 18, padding: 0 }}
                onClick={() => router.push("/dashboard")}
              >
                Volver
              </Button>
              <BoldTitle
                style={{ marginTop: 10, width: "100%" }}
                textAlign="center"
              >
                Mi Tarjeta Digital
              </BoldTitle>
            </div>
            <div className="mt-5"></div>
            <ThinTitle color="primary" variant="h5" textAlign="left">
              Compartir
            </ThinTitle>
            <div className="mt-3"></div>
            <ShareCard urlWithId={urlWithId} cardId={cardId} />
            <div className="mt-5"></div>
            <ThinTitle color="primary" variant="h5" textAlign="left">
              Información
            </ThinTitle>
            <div className="mt-3"></div>
            <InfoCard cardId={cardId} user={user} />
            <br />
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetails;
