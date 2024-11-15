import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import { IconButton, Typography } from "@mui/material";
import ThinTitle from "../components/texts/ThinTitle";
import { LiaEditSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import { GREY_RECTANGLE, SITE_NAME } from "../utils/constants";
import "../assets/styles/loader.css";
import StoreProductModal from "../components/modals/StoreProductModal";
import Image from "next/image";

const StoreProductsList = ({ products = [], setProducts, categories = [] }) => {
  const [productIdx, setProductIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const handleAddProduct = () => {
    const productsCopy = [...products];
    productsCopy.push({
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
    setProducts(productsCopy);
    setProductIdx(productsCopy.length - 1);
    setOpen(true);
  };

  const deleteProduct = (index) => {
    const productsCopy = [...products];
    productsCopy.splice(index, 1);
    setProducts(productsCopy);
  };

  return (
    <StyledCard style={{ padding: 30, paddingTop: 50 }}>
      {products.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color="secondary" textAlign="center">
            Gestiona tus productos.
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Agregar' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {products.map((product, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={product.id}
            >
              <Image
                src={
                  product.imgs.length > 0 ? product.imgs[0].url : GREY_RECTANGLE
                }
                width={100}
                height={100}
                style={{ maxWidth: 100, height: "auto", flex: 20 }}
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
        onClick={handleAddProduct}
      >
        <SmallPrimaryButton onClick={handleAddProduct}>
          Agregar
        </SmallPrimaryButton>
      </div>

      <StoreProductModal
        open={open}
        setOpen={setOpen}
        index={productIdx}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />
    </StyledCard>
  );
};

export default StoreProductsList;
