import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import { IconButton, Typography } from "@mui/material";
import ThinTitle from "../components/texts/ThinTitle";
import { LiaEditSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import {
  LICENSE_TYPES,
  licenseLimits,
  SITE_NAME,
  TRANSPARENT_SQUARE,
} from "../utils/constants";
import ProductModal from "../components/modals/ProductModal";
import { FaLock } from "react-icons/fa";
import Image from "next/image";

const ProductsServicesList = ({
  elementsInfo = { title: "", description: "", contactLinks: [], products: [] },
  setElementsInfo,
  cardId,
  licenseType = "",
  setOpenUpdate,
}) => {
  const [productIdx, setProductIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddProduct = () => {
    if (
      licenseLimits[licenseType].maxProducts <= elementsInfo.products.length
    ) {
      setOpenUpdate(
        licenseType === LICENSE_TYPES.PREMIUM ||
          licenseType === LICENSE_TYPES.BRONZE ||
          licenseType === LICENSE_TYPES.SILVER ||
          licenseType === LICENSE_TYPES.GOLD
          ? "products" + licenseType
          : "products"
      );
      return;
    }
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.products.push({
      name: "",
      show: true,
      id: Date.now(),
      price: {
        currency: "Bs.",
        number: 0,
        show: true,
      },
      offerPrice: {
        currency: "Bs.",
        number: 0,
        show: false,
      },
      description: "",
      category: -1,
      buttonAction: {
        forWpp: true,
        wppMessage: `Hola, vengo de ${SITE_NAME}`,
        wppNumber: "",
        buttonText: "Ordenar",
        customUrl: "",
      },
      imgs: [],
    });
    setElementsInfo(elementsInfoCopy);
    setProductIdx(elementsInfoCopy.products.length - 1);
    setOpen(true);
  };

  const deleteProduct = (index) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.products.splice(index, 1);
    setElementsInfo(elementsInfoCopy);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.products.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color="secondary" textAlign="center">
            Gestiona tus productos y servicios! Aquí puedes agregar, editar y
            gestionar tus productos o servicios para su venta.
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Agregar' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.products.map((product, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={product.id}
            >
              <Image
                src={
                  product.imgs.length > 0
                    ? product.imgs[0].url
                    : TRANSPARENT_SQUARE
                }
                width={100}
                height={100}
                style={{ maxWidth: 100, height: "auto", flex: 20 }}
                alt={`${product.name} - img`}
              />

              <Typography
                style={{
                  flex: 100,
                  wordWrap: "break-word",
                  width: 120,
                  textAlign: "center",
                }}
                marginLeft={2}
                marginRight={2}
              >
                {product.name}
              </Typography>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  setProductIdx(index);
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
      <div
        className="d-flex align-items-center justify-content-center"
        onClick={() => {
          if (
            licenseLimits[licenseType].maxProducts <=
            elementsInfo.products.length
          )
            handleAddProduct();
        }}
      >
        <SmallPrimaryButton
          onClick={handleAddProduct}
          disabled={
            licenseLimits[licenseType].maxProducts <=
            elementsInfo.products.length
          }
          endIcon={
            licenseLimits[licenseType].maxProducts <=
            elementsInfo.products.length ? (
              <FaLock />
            ) : (
              <></>
            )
          }
        >
          Agregar
        </SmallPrimaryButton>
      </div>

      <ProductModal
        open={open}
        setOpen={setOpen}
        elementsInfo={elementsInfo}
        setElementsInfo={setElementsInfo}
        index={productIdx}
        cardId={cardId}
        licenseType={licenseType}
      />
    </StyledCard>
  );
};

export default ProductsServicesList;
