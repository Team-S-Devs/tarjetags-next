import React, { useEffect, useState } from "react";
import Header from "../src/sections/Header";
import CustomFabButton from "../src/components/buttons/CustomFabButton";
import BoldTitle from "../src/components/texts/BoldTitle";
import { auth, db } from "../src/utils/firebase-config";
import HorizontalLine from "../src/components/lines/HorizontalLine";
import GreySubtitle from "../src/components/texts/GreySubtitle";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import "../src/assets/styles/loader.css";
import useWindowSize from "../src/hooks/useWindowsSize";
import NewCardModal from "../src/components/modals/NewCardModal";
import UserCardDisplay from "../src/components/card/UserCardsDisplay";
import { onAuthStateChanged } from "firebase/auth";
import { LICENSE_TYPES, SITE_NAME } from "../src/utils/constants";
import NearUpgrade from "../src/components/modals/NearUpgrade";
import { isLessThanOneMonthInFuture } from "../src/utils/methods";
import { useRouter } from "next/router";
import Head from "next/head";

const Dashboard = () => {
  const router = useRouter();
  const [userCards, setUserCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    setLoading(true);
    if (!userId) {
      router.push("/login");
    }

    const q = query(collection(db, "cards"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const cardsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserCards(cardsData);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(true);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [licenseType, setLicenseType] = useState("");
  const [limitDate, setLimitDate] = useState(new Date());

  const [openNear, setOpenNear] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        const user = docSnap.data();

        const licenseLimitDate = user.limitDate.toDate();
        const threeMonthsFrom = new Date(
          licenseLimitDate.getFullYear(),
          licenseLimitDate.getMonth() + 3,
          licenseLimitDate.getDate()
        );
        const limitDateVal =
          licenseLimitDate < new Date() ? threeMonthsFrom : licenseLimitDate;
        setLimitDate(limitDateVal);
        setLicenseType(
          licenseLimitDate > new Date() ? user.licenseType : LICENSE_TYPES.FREE
        );
        setOpenNear(isLessThanOneMonthInFuture(limitDateVal));
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  return (
    <div
      className="container d-flex flex-column align-items-end"
      style={{ height: "100vh", paddingBottom: "60px" }}
    >
      <Head>
        <title>{`Dashboard - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      <NearUpgrade
        open={openNear}
        setOpen={setOpenNear}
        licenseType={licenseType}
        limitDate={limitDate}
      />
      <Header />
      <div
        style={{ flex: 100, marginTop: 100, width: "100%" }}
        className="d-flex flex-column"
      >
        <BoldTitle textAlign="center">Mi Tarjeta</BoldTitle>
        <HorizontalLine />

        {loading ? (
          <div className="d-flex align-items-center justify-content-center h-100 w-100">
            <span className="loader"></span>
          </div>
        ) : error ? (
          <div
            style={{ flex: 100 }}
            className="container d-flex flex-column align-items-center justify-content-center"
          >
            <GreySubtitle
              color="secondary"
              variant="h6"
              textAlign={"center"}
              paddingHorizontal={40}
            >
              Hubo un error cargando tus tarjetas, por favor, recarga la página
              e inténtalo de nuevo.
            </GreySubtitle>
          </div>
        ) : userCards.length < 1 ? (
          <div
            style={{ flex: 100 }}
            className="container d-flex flex-column align-items-center justify-content-center"
          >
            <GreySubtitle
              paddingHorizontal={
                width > 1168 ? 260 : width > 992 ? 120 : width > 500 ? 20 : 0
              }
              color="secondary"
              variant="h6"
              textAlign={"center"}
            >
              ¡Estamos emocionados de tenerte aquí! Si deseas agregar una nueva
              tarjeta, solo tienes que hacer clic en el botón de “+”
            </GreySubtitle>
          </div>
        ) : (
          <UserCardDisplay userCards={userCards} />
        )}
      </div>
      {!loading && userCards.length < 1 && (
        <CustomFabButton onClick={() => setOpen(true)} />
      )}
      <NewCardModal open={open} setOpen={setOpen} userId={userId} />
    </div>
  );
};

export default Dashboard;
