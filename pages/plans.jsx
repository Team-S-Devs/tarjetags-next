import React, { useEffect, useState } from "react";
import Header from "../src/sections/Header";
import BoldTitle from "../src/components/texts/BoldTitle";
import ThinTitle from "../src/components/texts/ThinTitle";
import { SITE_NAME } from "../src/utils/constants";
import PricesSection from "../src/components/Prices/PricesSection";
import { Box, Container } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "../src/assets/styles/Prices/Plans.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/utils/firebase-config";
import Head from "next/head";

const Plans = () => {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
      } else {
        setUser(null);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [value, setValue] = useState("plans");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Head>
        <title>{`Planes - ${SITE_NAME}`}</title>
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
        <BoldTitle style={{ flex: 1 }} textAlign="center">
          Adquire una licencia
        </BoldTitle>
        <div className="mt-1 container" style={{ padding: 30 }}>
          <ThinTitle variant="h6" color="primary" textAlign="center">
            Adquiere una licencia y desbloquea un mundo de posibilidades para
            crear tarjetas más personalizadas y completas. Con nuestras
            licencias tendrás acceso a herramientas y funciones adicionales.
          </ThinTitle>
        </div>
        <br />
        <br />

        <Box className="box-Container">
          <TabContext value={value}>
            <Box className="tab-Container">
              <div
                className="tabList-Container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TabList
                  onChange={handleChange}
                  textColor="black"
                  indicatorColor="none"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tab
                    value="plans"
                    label="Planes Standard"
                    className="tab-Style"
                  />
                  <Tab
                    value="plansPartner"
                    label="Planes de Socios"
                    className="tab-Style"
                  />
                </TabList>
              </div>
              <br />
              <TabPanel value="plans" className="tabPanel-Style">
                <br />
                <br />
                <Container>
                  <PricesSection user={user} />
                </Container>
                <br />
                <br />
              </TabPanel>
              <TabPanel value="plansPartner" className="tabPanel-Style">
                <br />
                <h6
                  className="sub-tittle-section"
                  style={{ textAlign: "center" }}
                >
                  Todos los planes de socios incluyen los beneficios del plan
                  Premium
                </h6>
                <br />
                <Container>
                  <PricesSection user={user} showFirstTree={false} />
                </Container>
                <br />
                <br />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Plans;
