import React from "react";
import BigPrimaryButton from "../src/components/buttons/BigPrimaryButton";
import "../src/assets/styles/404style.css";
import Header from "../src/sections/Header";
import { SITE_NAME } from "../src/utils/constants";
import { useRouter } from "next/router";
import Head from "next/head";

const Error = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };
  return (
    <div className="container">
      <Head>
        <title>{`Página no encontrada - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      <Header />
      <br /><br /><br /><br /><br />
      <div className="general-background">
        <div className="container container-error-page">
          <h1 className="text-center ">404</h1>
          <div className="four_zero_four_bg"></div>
          <h3>¿ Te Perdiste ?</h3>
          <p>La Pagina que buscas no esta disponible!</p>
          <BigPrimaryButton children={"Volver al Inicio"} onClick={goHome} />
        </div>
      </div>
    </div>
  );
};

export default Error;
