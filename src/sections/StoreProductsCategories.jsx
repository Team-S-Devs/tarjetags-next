import React from "react";
import StyledCard from "../components/card/StyledCard";
import ThinTitle from "../components/texts/ThinTitle";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import { IconButton, TextField } from "@mui/material";
import { GoTrash } from "react-icons/go";

const StoreProductsCategories = ({
  categories = [],
  setCategories,
  disabled,
}) => {
  const deletedSocialLinkByIndex = (index) => {
    const categoriesCopy = [...categories];
    categoriesCopy.splice(index, 1);
    setCategories(categoriesCopy);
  };

  const handleInputChange = (e, index) => {
    const categoriesCopy = [...categories];
    categoriesCopy[index].title = e.target.value;
    setCategories(categoriesCopy);
  };

  const handleAddCategory = () => {
    const categoriesCopy = [...categories];
    categoriesCopy.push({
      title: "",
      id: Date.now(),
    });
    setCategories(categoriesCopy);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {categories.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color={"secondary"} textAlign="center">
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
          {categories.map((category, index) => (
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
        <SmallPrimaryButton onClick={handleAddCategory}>
          Agregar Categoría
        </SmallPrimaryButton>
      </div>
    </StyledCard>
  );
};

export default StoreProductsCategories;
