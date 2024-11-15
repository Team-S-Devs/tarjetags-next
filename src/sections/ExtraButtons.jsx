import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import { IconButton, Typography } from "@mui/material";
import ThinTitle from "../components/texts/ThinTitle";
import { LiaEditSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import { GREY_RECTANGLE } from "../utils/constants";
import ExtraButtonModal from "../components/modals/ExtraButtonModal";
import useWindowSize from "../hooks/useWindowsSize";
import Image from "next/image";

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
}) => {
  const [buttonIdx, setButtonIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddProduct = () => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.extraButtons.push({
      id: Date.now(),
      url: "",
      name: "",
      imgUrl: "",
    });
    setElementsInfo(elementsInfoCopy);
    setButtonIdx(elementsInfoCopy.extraButtons.length - 1);
    setOpen(true);
  };

  const deleteProduct = (index) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.extraButtons.splice(index, 1);
    setElementsInfo(elementsInfoCopy);
  };

  const { width } = useWindowSize();

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.extraButtons?.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color="secondary" textAlign="center">
            Conecte a sus clientes con servicios complementarios al agregar
            botones de enlace. Haga que sea sencillo acceder a información
            adicional sobre sus ofertas.
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Agregar botón' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.extraButtons?.map((button, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={button.id}
            >
              <Image
                src={button.imgUrl !== "" ? button.imgUrl : GREY_RECTANGLE}
                width={62}
                height={62}
                style={{
                  objectFit: "cover",
                  flex: 20,
                  maxWidth: 62,
                }}
              />

              <div style={{ flex: 100, textAlign: "left" }}>
                <Typography
                  style={{
                    wordWrap: "break-word",
                    textAlign: "left",
                  }}
                  maxWidth={width > 900 ? 400 : 120}
                  marginLeft={5}
                  marginRight={2}
                >
                  {button.name}
                </Typography>
                <Typography
                  style={{
                    wordWrap: "break-word",
                    textAlign: "left",
                  }}
                  maxWidth={width > 900 ? 400 : 120}
                  marginLeft={5}
                  marginRight={2}
                  variant="caption"
                >
                  {button.url}
                </Typography>
              </div>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  setButtonIdx(index);
                }}
              >
                <LiaEditSolid size={30} color="#4C77EA" />
              </IconButton>
              <IconButton color="error" onClick={() => deleteProduct(index)}>
                <GoTrash />
              </IconButton>
            </div>
          ))}
        </>
      )}
      <div className="mt-4"></div>
      <div className="d-flex align-items-center justify-content-center">
        <SmallPrimaryButton onClick={handleAddProduct}>
          Agregar botón
        </SmallPrimaryButton>
      </div>

      <ExtraButtonModal
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
