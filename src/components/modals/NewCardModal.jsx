import { Card, Dialog } from "@mui/material";
import React, { useState } from "react";
import BoldTitle from "../texts/BoldTitle";
import ThinTitle from "../texts/ThinTitle";
import FieldText from "../form/fields/FieldText";
import useWindowSize from "../../hooks/useWindowsSize";
import SmallPrimaryButton from "../buttons/SmallPrimaryButton";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import { URL_NAME } from "../../utils/constants";
import { useRouter } from "next/router";

const NewCardModal = ({ open, setOpen, userId }) => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const [newCardValue, setNewCardValue] = useState("");
  const [errorNewVal, setErrorNewVal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (newVal) => {
    if (errorNewVal) setErrorNewVal(false);
    let inputValue = newVal;
    inputValue = inputValue.replace(/\s/g, "_");
    setNewCardValue(inputValue.toLowerCase());
    handleValidateVal(inputValue);
  };

  const handleValidateVal = (value) => {
    if (!/^[a-zA-Z0-9-_\u00f1\u00d1]*$/.test(value)) {
      setErrorNewVal(true);
      setErrorMsg("Sólo se aceptan letras sin acentos, números, - y _");
    }
  };

  const reservedWords = [
    "dashboard",
    "login",
    "sign-up",
    "profile",
    "edit",
    "error",
    "details",
    "plans",
    "admin",
    "store"
  ];

  const saveNewCard = async () => {
    setLoading(true);
    try {
      const cardsCollection = doc(db, "cards", newCardValue);

      const cardDoc = await getDoc(cardsCollection);
      if (cardDoc.exists() || reservedWords.includes(newCardValue)) {
        setErrorNewVal(true);
        setErrorMsg("Enlace ya en uso, por favor introduce otro.");
        setLoading(false);
        return;
      }

      const newCard = {
        id: newCardValue,
        title: "",
        showShareButton: true,
        description: "",
        userId: userId,
        urlPage: newCardValue,
        createdAt: Timestamp.now(),
      };

      await setDoc(cardsCollection, newCard);
      router.push(`/edit/${newCardValue}`);
    } catch (error) {
      setError(true);
      setErrorMsg(
        "Hubo un error al crear la tarjeta, por favor inténtalo de nuevo."
      );
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
        },
      }}
    >
      <Card
        style={{
          padding: width > 768 ? 60 : 20,
        }}
      >
        <BoldTitle textAlign="center" variant="h4">
          Crear tarjeta
        </BoldTitle>
        <div className="mt-3"></div>

        <ThinTitle textAlign={width > 768 ? "left" : "center"} variant="h6">
          Introduce el nombre de tu tarjeta
        </ThinTitle>
        <div className="mt-1"></div>

        <div className="d-flex align-items-center justify-content-center">
          <ThinTitle variant={width > 768 ? "h6" : "body2"} color="primary">
            {URL_NAME}
          </ThinTitle>
          <div style={{ width: width > 768 ? 30 : 15 }}></div>
          <FieldText
            variant="standard"
            label="Nombre único:"
            helperText={
              newCardValue.length === 25 ? "Máximo 25 caracteres" : " "
            }
            value={newCardValue}
            setValue={handleInputChange}
            error={errorNewVal}
            setError={setErrorNewVal}
            errorMessage={errorMsg}
            validateMethod={handleValidateVal}
            maxLength={25}
            multiline={false}
          />
        </div>
        <div className="mt-2"></div>
        <ThinTitle color="#444" textAlign="center" variant="subtitle1">
          Tu título se convertirá en tu enlace personalizado. Escoge uno que te
          represente.
        </ThinTitle>
        <div className="mt-4"></div>

        <div className="d-flex">
          <div className="flex-5" style={{ flex: 100 }}></div>
          <SmallPrimaryButton onClick={() => setOpen(false)} variant="outlined">
            Cancelar
          </SmallPrimaryButton>
          <div style={{ width: 8 }}></div>
          <SmallPrimaryButton
            disabled={errorNewVal || newCardValue.length === 0}
            onClick={saveNewCard}
            loading={loading}
          >
            Crear
          </SmallPrimaryButton>
        </div>
      </Card>
    </Dialog>
  );
};

export default NewCardModal;
