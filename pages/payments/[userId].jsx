import React, { useState, useEffect } from "react";
import Header from "../../src/sections/Header";
import BoldTitle from "../../src/components/texts/BoldTitle";
import { SITE_NAME } from "../../src/utils/constants";
import useWindowSize from "../../src/hooks/useWindowsSize";
import GreySubtitle from "../../src/components/texts/GreySubtitle";
import { db } from "../../src/utils/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import PaymentRow from "../../src/components/admin/PaymentRow";
import { useRouter } from "next/router";
import Head from "next/head";

const Payments = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const licenses = userData.licenses || [];
          setPaymentHistory(licenses);
          setUserEmail(userData?.email);
        } else {
          alert("No se pudo registrar el pago.")
        }

        setLoading(false);
      } catch (error) {
        alert("No se pudo obtener el historial de pagos");
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [userId]);

  useEffect(() => {
    document.title = `Historial De Pagos - ${SITE_NAME}`;
  }, []);

  const isPaymentsEmpty = paymentHistory.length < 1;

  return (
    <div className="profile-container">
      <Head>
        <title>{`Historial de Pagos - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      <Header />
      <Header />

      <div
        className="my-5 my-md-0 d-flex flex-column justify-content-center container cont-profile1"
        style={{ minHeight: "100vh" }}
      >
        <BoldTitle variant={width > 500 ? "h3" : "h5"} textAlign="center">
          Historial De Pagos
        </BoldTitle>

        <GreySubtitle variant={width > 500 ? "h5" : "h6"} textAlign="center">
          {userEmail}
        </GreySubtitle>

        <div className="bg-white adminTable">
          {loading ? (
            <div className="d-flex mt-4 mb-2 align-items-center justify-content-center loader_style">
              <span className="loader"></span>
            </div>
          ) : isPaymentsEmpty ? (
            <div className="container-not-found">
              <div className="not-found-style">
                <h4>No hay registro de pagos</h4>
                <p>prueba otro usuario</p>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nº</th>
                    <th>Fecha de Pago</th>
                    <th>Tipo de licencia</th>
                    <th>Codigo de descuento</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((license, index) => (
                    <PaymentRow data={license} nro={index} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
