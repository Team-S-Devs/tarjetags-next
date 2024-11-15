import React, { useEffect, useState } from "react";
import { LICENSE_TYPES, MAIN_COLOR, SITE_NAME } from "../src/utils/constants";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../src/utils/firebase-config";
import { verificarLicencia } from "../src/utils/methods";
import Preview from "../src/sections/Preview";
import "../src/assets/styles/loader.css";
import marca from "../src/assets/images/auth/Marca.svg";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getServerSideProps(context) {
  console.log('getServerSideProps ejecutado');
  console.log('cardId:', context.params.cardId);

  const { cardId } = context.params;
  console.log(cardId + "card")
  let elementsInfo = {
    title: "Tarjeta",
    description: "",
    profilePhoto: { name: "profilePhoto", file: null, url: "" },
    coverPhoto: { name: "coverPhoto", file: null, url: "" },
  };

  try {
    const cardDocRef = doc(db, "cards", cardId);
    const cardSnapshot = await getDoc(cardDocRef);

    if (cardSnapshot.exists()) {
      elementsInfo = cardSnapshot.data();
      elementsInfo.createdAt = "";
      if (!elementsInfo.profilePhoto) {
        elementsInfo.profilePhoto = {
          name: "profilePhoto",
          file: null,
          url: "",
        };
      }
      if (!elementsInfo.coverPhoto) {
        elementsInfo.coverPhoto = { name: "coverPhoto", file: null, url: "" };
      }
    } else {
      return { notFound: true }; // Redirige a 404 si no existe
    }
  } catch (error) {
    return { notFound: true };
  }

  return { props: { cardData: elementsInfo } };
}

const Card = ({ cardData }) => {
  const router = useRouter();
  const { cardId } = router.query;

  const [licenseType, setLicenseType] = useState("");

  const [loadingGetting, setLoadingGetting] = useState(true);

  const [elementsInfo, setElementsInfo] = useState({
    title: "Tarjeta",
    description: "",
    profilePhoto: {
      name: "profilePhoto",
      file: null,
      url: "",
    },
    coverPhoto: {
      name: "coverPhoto",
      file: null,
      url: "",
    },
  });

  useEffect(() => {
    const fetchCardData = async () => {
      setLoadingGetting(true);

      try {
        const cardDocRef = doc(db, "cards", cardId);
        const cardSnapshot = await getDoc(cardDocRef);

        if (cardSnapshot.exists()) {
          const cardFields = cardSnapshot.data();
          if (!cardFields.profilePhoto)
            cardFields["profilePhoto"] = {
              name: "profilePhoto",
              url: "",
              file: null,
            };
          if (!cardFields.coverPhoto)
            cardFields["coverPhoto"] = {
              name: "coverPhoto",
              url: "",
              file: null,
            };
          if (!cardFields.socialLinks) cardFields["socialLinks"] = [];
          if (!cardFields.contactLinks) cardFields["contactLinks"] = [];
          if (!cardFields.productCategories)
            cardFields["productCategories"] = [];
          if (!cardFields.products) cardFields["products"] = [];
          if (!cardFields.extraButtons) cardFields["extraButtons"] = [];
          if (!cardFields.adminCards) cardFields["adminCards"] = [];
          if (!cardFields.theme) cardFields["theme"] = "light";
          if (!cardFields.color) cardFields["color"] = MAIN_COLOR;

          setElementsInfo(cardFields);

          const docSnap = await getDoc(doc(db, "users", cardFields.userId));
          const user = docSnap.data();

          const userLimitDate = user.limitDate;
          setLicenseType(
            userLimitDate.toDate() > new Date()
              ? user.licenseType
              : LICENSE_TYPES.FREE
          );
          if (!verificarLicencia(user.licenseType, userLimitDate)) {
            router.push("/404");
          }
        } else {
          router.push("/404");
        }
      } catch (error) {
        router.push("/404");
      }
      setLoadingGetting(false);
    };

    if (cardId) fetchCardData();
  }, [cardId]);

  return (
    <div>
      <Head>
        <title>{`${cardData?.title} - ${SITE_NAME}`}</title>
        <meta name="description" content={cardData?.description} />
        <meta
          property="og:image"
          content={
            cardData?.profilePhoto && cardData?.profilePhoto.url !== ""
              ? cardData?.profilePhoto.url
              : marca
          }
        />
      </Head>
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
        <div>
          <div
            style={{
              height: "100vh",
            }}
          >
            <Preview elementsInfo={elementsInfo} licenseType={licenseType} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
