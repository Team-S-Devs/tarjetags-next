import React from "react";
import { Typography } from "@mui/material";
import ImagesSlider from "./ImagesSlider";
import PriceOffer from "./PriceOffer";
import ProductButton from "./ProductButton";
import ImagesProdsView from "./ImagesProdsView";

const ProductsView = ({
  elemInfo = {},
  products = [],
  editPreview = false,
  textColor = "#fff",
  color,
}) => {
  return (
    <>
      {products.length > 0 && (
        <div>
          {products.map((product, index) => (
            <div
              key={index}
              className={
                "card-container" +
                (elemInfo.theme == "dark"
                  ? " dark-prod-theme white-prod-theme"
                  : " white-prod-theme")
              }
            >
              <ImagesProdsView
                editPreview={editPreview}
                images={product.imgs}
              ></ImagesProdsView>
              <div
                className="text-preview-product"
                style={{ maxWidth: editPreview ? "300px" : "500px" }}
              >
                <Typography
                  color={color}
                  style={{ fontWeight: "bolder", wordBreak: "break-word" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  color={color}
                  style={{
                    wordBreak: "break-word",
                    textAlign: "left",
                    marginTop: ".1rem",
                  }}
                >
                  {product.description}
                </Typography>
                <PriceOffer
                  color={color}
                  products={products}
                  activeIndex={index}
                />
              </div>
              <ProductButton
                elemInfo={elemInfo}
                textColor={textColor}
                products={products}
                activeIndex={index}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsView;
