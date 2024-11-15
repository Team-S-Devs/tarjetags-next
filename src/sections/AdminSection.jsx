import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import ThinTitle from "../components/texts/ThinTitle";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import AdminSectionModal from "../components/modals/AdminSectionModal";
import AdminItem from "./AdminItem";
import { licenseLimits } from "../utils/constants";
import { FaLock } from "react-icons/fa";

const ExtraButtons = ({
  elementsInfo = {
    title: "",
    description: "",
    contactLinks: [],
    products: [],
    extraButtons: [{ id: 0, name: "", url: "", imgUrl: "" }],
  },
  setElementsInfo,
  cardId,
  licenseType,
  disabled,
}) => {
  const [buttonIdx, setButtonIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddCard = () => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.adminCards.push("");
    setElementsInfo(elementsInfoCopy);
    setButtonIdx(elementsInfoCopy.adminCards.length - 1);
    setOpen(true);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.adminCards.length === 0 ? (
        <>
          <ThinTitle
            variant="subtitle1"
            color={!licenseLimits[licenseType].admin ? "gray" : "secondary"}
            textAlign="center"
          >
            Vincule las cuentas de sus colegas u otros miembros de su misma
            empresa para que puedan ser visibles desde su tarjeta
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Vincular cuenta' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.adminCards.map((card, index) => (
            <AdminItem
              currCard={card}
              index={index}
              key={index + "card"}
              setButtonIdx={setButtonIdx}
              setOpen={setOpen}
              setElementsInfo={setElementsInfo}
              elementsInfo={elementsInfo}
              disabled={disabled}
            />
          ))}
        </>
      )}
      <div className="mt-4"></div>
      <div className="d-flex align-items-center justify-content-center">
        <SmallPrimaryButton
          onClick={handleAddCard}
          disabled={!licenseLimits[licenseType].admin}
          endIcon={!licenseLimits[licenseType].admin ? <FaLock /> : <></>}
        >
          Vincular cuenta
        </SmallPrimaryButton>
      </div>

      <AdminSectionModal
        open={open}
        setOpen={setOpen}
        elementsInfo={elementsInfo}
        setElementsInfo={setElementsInfo}
        index={buttonIdx}
        cardId={cardId}
      />
    </StyledCard>
  );
};

export default ExtraButtons;
