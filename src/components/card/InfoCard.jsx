import React, { useEffect, useState } from "react";
import StyledCard from "./StyledCard";
import { db } from "../../utils/firebase-config";
import { doc, getDoc, onSnapshot, Timestamp } from "firebase/firestore";
import lightPurpleSvg from "../../assets/images/light-purple.svg";
import { Grid } from "@mui/material";
import ThinTitle from "../texts/ThinTitle";
import {
  getDateFromTimestamp,
  getRemainingTimeAsString,
  getStringDateFromTimestamp,
  isLessThanThreeMonthsInFuture,
  verificarLicencia,
} from "../../utils/methods";
import MediumPrimaryButton from "../buttons/MediumPrimaryButton";
import { FaStar } from "react-icons/fa";
import { LICENSE_TYPES } from "../../utils/constants";
import { useRouter } from "next/router";
import Image from "next/image";

const InfoCard = ({ cardId, user }) => {
  const [loadingGetting, setLoadingGetting] = useState(true);
  const [elementsInfo, setElementsInfo] = useState({
    title: "",
    description: "",
    profilePhoto: "",
    coverPhoto: "",
  });
  const [license, setLicense] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [isPro, setIsPro] = useState(true);
  const [proxVenc, setProxVenc] = useState(false);
  const [remainingLicense, setRemainingLicense] = useState("");
  const [validLicense, setValidLicense] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCardData = async () => {
      setLoadingGetting(true);
      try {
        const cardDocRef = doc(db, "cards", cardId);
        const cardSnapshot = await getDoc(cardDocRef);

        if (cardSnapshot.exists()) {
          const cardFields = cardSnapshot.data();

          setElementsInfo({
            ...cardFields,
            createdAt: getStringDateFromTimestamp(cardFields.createdAt),
          });
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        router.push("/dashboard");
      }
      setLoadingGetting(false);
    };

    fetchCardData();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {
        const userInfo = snapshot.data();
        const userLimitDate = userInfo.limitDate;

        setIsPro(getDateFromTimestamp(userLimitDate) >= new Date());
        const licenseTypeCopy =
          userLimitDate.toDate() > new Date()
            ? userInfo.licenseType
            : LICENSE_TYPES.FREE;
        setLicenseType(licenseTypeCopy);
        const isValidLicense = verificarLicencia(
          userInfo.licenseType,
          userLimitDate
        );
        setValidLicense(isValidLicense);
        setProxVenc(isLessThanThreeMonthsInFuture(userInfo.limitDate));

        const limitDateUser = userInfo.limitDate.toDate();
        const threeMonthsFromNow = new Date(
          limitDateUser.getFullYear(),
          limitDateUser.getMonth() + 3,
          limitDateUser.getDate()
        );

        const realTimestampDate =
          limitDateUser < new Date()
            ? Timestamp.fromDate(threeMonthsFromNow)
            : userInfo.limitDate;

        const realDate = realTimestampDate.toDate();

        if (isValidLicense)
          setLicense("Hasta " + getStringDateFromTimestamp(realTimestampDate));
        else setLicense("Caducada");

        const bool =
          userInfo.license !== LICENSE_TYPES.FREE &&
          userInfo.limitDate.toDate() < new Date();
        setRemainingLicense(getRemainingTimeAsString(realDate));
      },
      (error) => {
        router.push("/");
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <StyledCard>
      {loadingGetting ? (
        <div className="d-flex align-items-center justify-content-center">
          <div className="mt-4 mb-4 loader"></div>
        </div>
      ) : (
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              src={
                elementsInfo.coverPhoto?.url &&
                elementsInfo.coverPhoto?.url !== ""
                  ? elementsInfo.coverPhoto.url
                  : lightPurpleSvg
              }
              alt={`${elementsInfo.title}`}
              width={400}
              height={200}
              className="portrait-card-img"
            />
            <Image
              src={
                elementsInfo.profilePhoto?.url &&
                elementsInfo.profilePhoto?.url !== ""
                  ? elementsInfo.profilePhoto.url
                  : lightPurpleSvg
              }
              alt={`${elementsInfo.title}`}
              width={100}
              height={100}
              className="profile-card-img"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
          >
            <div className="d-flex">
              <ThinTitle color="primary" variant="h6" textAlign="left">
                Titulo:&nbsp;&nbsp;&nbsp;
              </ThinTitle>
              <ThinTitle color="black" variant="h6" textAlign="left">
                {elementsInfo.title}
              </ThinTitle>
            </div>
            <div className="mt-1"></div>
            <div className="d-flex">
              <ThinTitle color="primary" variant="h6" textAlign="left">
                Fecha de creación:&nbsp;&nbsp;&nbsp;
                <span style={{ color: "#000" }}>{elementsInfo.createdAt}</span>
              </ThinTitle>
            </div>
            <div className="mt-1"></div>
            <div className="d-flex">
              <ThinTitle color="primary" variant="h6" textAlign="left">
                Licencia:&nbsp;&nbsp;&nbsp;
              </ThinTitle>
              <ThinTitle color="black" variant="h6" textAlign="left">
                {licenseType} {`${license}`}
              </ThinTitle>
            </div>
            {(!isPro || licenseType === LICENSE_TYPES.FREE) &&
              !validLicense && (
                <div className="mt-2">
                  <MediumPrimaryButton
                    startIcon={<FaStar size={14} />}
                    onClick={() => router.push("/plans")}
                  >
                    Adquirir licencia
                  </MediumPrimaryButton>
                </div>
              )}
            {proxVenc && validLicense && (
              <div className="mt-3">
                <ThinTitle color="#888" variant="h6" textAlign="left">
                  {remainingLicense}
                </ThinTitle>
                <div className="mt-2"></div>
                <MediumPrimaryButton
                  startIcon={<FaStar size={14} />}
                  onClick={() => router.push("/plans")}
                >
                  Renovar licencia
                </MediumPrimaryButton>
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </StyledCard>
  );
};

export default InfoCard;
