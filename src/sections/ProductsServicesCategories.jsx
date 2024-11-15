import React from "react";
import StyledCard from "../components/card/StyledCard";
import ThinTitle from "../components/texts/ThinTitle";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import { IconButton, TextField } from "@mui/material";
import { GoTrash } from "react-icons/go";
import { licenseLimits } from "../utils/constants";
import { FaLock } from "react-icons/fa";

const ProductsServicesCategories = ({
  elementsInfo = { title: "", description: "", socialLinks: [] },
  setElementsInfo,
  licenseType = "",
  disabled,
}) => {
  const deletedSocialLinkByIndex = (index) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.productCategories.splice(index, 1);
    setElementsInfo(elementsInfoCopy);
  };

  const handleInputChange = (e, index) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.productCategories[index].title = e.target.value;
    setElementsInfo(elementsInfoCopy);
  };

  const handleAddCategory = () => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.productCategories.push({
      title: "",
      id: Date.now(),
    });
    setElementsInfo(elementsInfoCopy);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.productCategories.length === 0 ? (
        <>
          <ThinTitle
            variant="subtitle1"
            color={
              !licenseLimits[licenseType].productsDivision
                ? "gray"
                : "secondary"
            }
            textAlign="center"
          >
            Agrega diferentes categorías para la organización de tus productos o
            servicios
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Agregar Categoría' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.productCategories.map((category, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={category.id}
            >
              <TextField
                value={category.title}
                fullWidth
                label="Título de la categoría:"
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              <IconButton
                color="error"
                onClick={() => deletedSocialLinkByIndex(index)}
                disabled={disabled}
              >
                <GoTrash />
              </IconButton>
            </div>
          ))}
        </>
      )}
      <div className="mt-4"></div>
      <div className="d-flex align-items-center justify-content-center">
        <SmallPrimaryButton
          disabled={!licenseLimits[licenseType].productsDivision}
          onClick={handleAddCategory}
          endIcon={
            !licenseLimits[licenseType].productsDivision ? <FaLock /> : <></>
          }
        >
          Agregar Categoría
        </SmallPrimaryButton>
      </div>
    </StyledCard>
  );
};

export default ProductsServicesCategories;
