import React, { useEffect, useState } from "react";
import Header from "../src/sections/Header";
import BoldTitle from "../src/components/texts/BoldTitle";
import { SITE_NAME } from "../src/utils/constants";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import StoreProductsList from "../src/sections/StoreProductsList";
import { auth, db } from "../src/utils/firebase-config";
import StoreProductsCategories from "../src/sections/StoreProductsCategories";
import CircularProgress from "@mui/material/CircularProgress";
import BigPrimaryButton from "../src/components/buttons/BigPrimaryButton";
import useWindowSize from "../src/hooks/useWindowsSize";
import ThinTitle from "../src/components/texts/ThinTitle";
import Splash from ".";
import { useRouter } from "next/router";
import Head from "next/head";
import { onAuthStateChanged } from "firebase/auth";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [loadingSaving, setLoadingSaving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const storeDocRef = doc(db, "admin", "store");
        const storeDocSnapshot = await getDoc(storeDocRef);

        if (storeDocSnapshot.exists()) {
          const storeData = storeDocSnapshot.data();
          if (storeData && storeData.products) {
            setProducts(storeData.products);
            setCategories(storeData.categories);
          } else {
            alert("No hay datos de la tienda disponibles, inténtalo de nuevo.");
          }
        } else {
          alert("No se pudo acceder a los products, inténtalo de nuevo");
        }
      } catch (error) {
        alert("Error obteniendo datos de la tienda", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSave = async () => {
    setLoadingSaving(true);
    try {
      const adminCollectionRef = collection(db, "admin");
      const storeDocRef = doc(adminCollectionRef, "store");

      await updateDoc(storeDocRef, { products, categories });
    } catch (error) {
      alert("No se pudo guardar, inténtalo de nuevo.");
    } finally {
      setLoadingSaving(false);
    }
  };

  const { height, width } = useWindowSize();

  const [loadingGetting, setLoadingGetting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoadingGetting(true);
    onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        onSnapshot(doc(db, "users", fireBaseUser.uid), (snapshot) => {
          const userInfo = snapshot.data();
          if (!userInfo.admin) router.replace("/404");
          setLoadingGetting(false);
        });
      } else {
        router.replace("/404");
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (fireBaseUser) => {
      if (!fireBaseUser) {
        router.replace("/404");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loadingGetting) {
    return <Splash loggedNavigateTo="/store" />;
  }

  return (
    <div className="container" style={{ paddingBottom: 164 }}>
      <Head>
        <title>{`Tienda- ${SITE_NAME}`}</title>
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
        <BoldTitle style={{ flex: 1, marginBottom: 40 }} textAlign="center">
          Tienda
        </BoldTitle>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <ThinTitle variant="h5" color="primary" textAlign="center">
              División de productos
            </ThinTitle>
            <br />
            <StoreProductsCategories
              categories={categories}
              setCategories={setCategories}
            />
            <br />
            <ThinTitle variant="h5" color="primary" textAlign="center">
              Productos
            </ThinTitle>
            <br />
            <StoreProductsList
              products={products}
              setProducts={setProducts}
              categories={categories}
            />
          </>
        )}

        <div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              marginTop: 24,
              position: "fixed",
              paddingTop: 24,
              bottom: 0,
              paddingBottom: height > 980 ? 120 : 24,
              left: 0,
              background: "#fff",
              width: "100vw",
              boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <BigPrimaryButton onClick={handleSave} loading={loadingSaving}>
              Guardar
            </BigPrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
