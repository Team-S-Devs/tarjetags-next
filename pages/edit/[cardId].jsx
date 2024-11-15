import React, { useEffect, useState } from "react";
import Header from "../../src/sections/Header";
import BoldTitle from "../../src/components/texts/BoldTitle";
import EditCardTabs from "../../src/sections/EditCardTabs";
import PreviewCardTab from "../../src/sections/PreviewCardTab";
import useWindowSize from "../../src/hooks/useWindowsSize";
import {
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import MediumPrimaryButton from "../../src/components/buttons/MediumPrimaryButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../src/utils/firebase-config";
import "../../src/assets/styles/loader.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { LICENSE_TYPES, MAIN_COLOR, SITE_NAME } from "../../src/utils/constants";
import { verificarLicencia } from "../../src/utils/methods";
import UpdateLicenseModal from "../../src/components/modals/UpdateLicenseModal";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/router";
import Head from "next/head";

const EditCard = () => {
  const router = useRouter();
  const { cardId } = router.query;
  const { width } = useWindowSize();

  const [nav, setNav] = useState("edit");
  const [idCard, setIdCard] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [validLicense, setValidLicense] = useState(true);
  const [openUpdate, setOpenUpdate] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingGetting, setLoadingGetting] = useState(true);

  const handleChange = (event, newValue) => {
    if (newValue == null) return;
    if (newValue != nav) setNav(newValue);
  };

  const [elementsInfo, setElementsInfo] = useState({
    title: "",
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

  const simpleSave = async () => {
    setLoading(true);
    let elCopy = { ...elementsInfo };
    if (elCopy.profilePhoto.file != null && elCopy.coverPhoto != null) {
      elCopy = await handleImageUpload();
    } else if (elCopy.profilePhoto.file == null) {
      delete elCopy.profilePhoto;
    } else {
      delete elCopy.coverPhoto;
    }
    const docCard = doc(db, "cards", cardId);

    try {
      await updateDoc(docCard, { ...elCopy });
    } catch (error) {}

    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    let elCopy = { ...elementsInfo };
    if (elCopy.profilePhoto.file != null && elCopy.coverPhoto != null) {
      elCopy = await handleImageUpload();
    } else if (elCopy.profilePhoto.file == null) {
      delete elCopy.profilePhoto;
    } else {
      delete elCopy.coverPhoto;
    }
    const docCard = doc(db, "cards", cardId);

    try {
      await updateDoc(docCard, { ...elCopy });
      router.push(`/details/${cardId}`);
    } catch (error) {
      alert("Hubo un error, por favor inténtalo de nuevo");
    }

    setLoading(false);
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    const { profilePhoto, coverPhoto } = elementsInfo;

    const returnOBject = {
      ...elementsInfo,
    };

    if (profilePhoto.file) {
      try {
        const storageRef = ref(
          storage,
          `${elementsInfo.userId}/${cardId}/profilePhoto`
        );
        await uploadBytes(storageRef, profilePhoto.file);
        const url = await getDownloadURL(storageRef);

        returnOBject["profilePhoto"] = {
          ...profilePhoto,
          file: "",
          url,
        };
      } catch (error) {
        alert("Error subiendo imagen, inténtalo de nuevo.");
      }
    }

    if (coverPhoto.file) {
      try {
        const storageRef = ref(
          storage,
          `${elementsInfo.userId}/${cardId}/coverPhoto`
        );
        await uploadBytes(storageRef, coverPhoto.file);

        const url = await getDownloadURL(storageRef);

        returnOBject["coverPhoto"] = {
          ...coverPhoto,
          file: "",
          url,
        };
      } catch (error) {
        alert("Error subiendo imagen, inténtalo de nuevo.");
      }
    }

    setElementsInfo(returnOBject);

    return returnOBject;
  };

  useEffect(() => {
    const fetchCardData = async () => {
      setLoadingGetting(true);
      try {
        const cardDocRef = doc(db, "cards", cardId);
        const cardSnapshot = await getDoc(cardDocRef);
        setIdCard(cardDocRef.id);

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
          setValidLicense(verificarLicencia(user.licenseType, userLimitDate));
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

  return (
    <div className="container" style={{ paddingTop: "90px" }}>
      <Head>
        <title>{`Editar tarjeta ${elementsInfo.title} - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      <Header />
      {validLicense ? (
        <>
          <BoldTitle textAlign="center">Editar Tarjeta</BoldTitle>
          <div className="mt-3"></div>
          <>
            {loadingGetting ? (
              <div className="full-container d-flex align-items-center justify-content-center w-100">
                <span className="loader"></span>
              </div>
            ) : (
              <>
                {width > 986 ? (
                  <div className="d-flex">
                    <EditCardTabs
                      elementsInfo={elementsInfo}
                      setElementsInfo={setElementsInfo}
                      cardId={idCard}
                      licenseType={licenseType}
                      setOpenUpdate={setOpenUpdate}
                    />
                    <PreviewCardTab
                      handleSave={handleSave}
                      loading={loading}
                      elementsInfo={elementsInfo}
                      licenseType={licenseType}
                    />
                  </div>
                ) : (
                  <>
                    <ToggleButtonGroup
                      color="primary"
                      value={nav}
                      exclusive
                      onChange={handleChange}
                      fullWidth
                    >
                      <ToggleButton value="edit">Edición</ToggleButton>
                      <ToggleButton value="preview">Vista Previa</ToggleButton>
                    </ToggleButtonGroup>
                    {nav === "edit" ? (
                      <EditCardTabs
                        elementsInfo={elementsInfo}
                        setElementsInfo={setElementsInfo}
                        cardId={idCard}
                        licenseType={licenseType}
                        setOpenUpdate={setOpenUpdate}
                      />
                    ) : (
                      <PreviewCardTab
                        handleSave={handleSave}
                        loading={loading}
                        elementsInfo={elementsInfo}
                        licenseType={licenseType}
                      />
                    )}
                    <div
                      style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "10px",
                        boxSizing: "border-box",
                      }}
                      className="container"
                    >
                      <MediumPrimaryButton
                        loading={loading}
                        onClick={handleSave}
                        fullWidth
                      >
                        Publicar Cambios
                      </MediumPrimaryButton>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        </>
      ) : (
        <Dialog
          open={!loadingGetting}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Licencia expirada</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El límite de la Licencia Gratuita ha expirado. Adquiere una
              licencia para editar y publicar su tarjeta.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                router.push("/plans");
              }}
              startIcon={<FaStar />}
              variant="contained"
              color="primary"
            >
              Adquirir Licencia
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <UpdateLicenseModal
        open={openUpdate !== ""}
        setOpen={(bool) => setOpenUpdate(!bool ? "" : "admin")}
        keyLic={openUpdate}
        handleSave={simpleSave}
      />
    </div>
  );
};

export default EditCard;
