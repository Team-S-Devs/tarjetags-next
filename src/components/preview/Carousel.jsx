import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import ImagesSlider from "./ImagesSlider";
import PriceOffer from "./PriceOffer";
import ProductButton from "./ProductButton";

const Carousel = ({
  elemInfo = {},
  products = [],
  editPreview = false,
  index = 0,
  textColor = "#fff",
  color,
}) => {
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const [activeIndex, setActiveIndex] = useState(index);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX && endX) {
      const difference = startX - endX;
      const threshold = Math.abs(difference) / 2;
      if (difference > threshold) {
        nextSlide();
      } else if (difference < -threshold) {
        prevSlide();
      }
    }
    setStartX(null);
    setEndX(null);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [products]);

  return (
    <>
      {products.length > 0 && products[activeIndex] != null && (
        <div
          className="carouselA"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {" "}
          {products.filter((prod) => prod.show).length > 1 && (
            <button
              onClick={prevSlide}
              className="carouselA__btn carouselA__btn--prev"
            >
              &lt;
            </button>
          )}
          <div
            className={
              "card-container" +
              (elemInfo.theme == "dark"
                ? " dark-prod-theme white-prod-theme"
                : " white-prod-theme")
            }
          >
            <ImagesSlider
              editPreview={editPreview}
              images={products[activeIndex].imgs}
            ></ImagesSlider>

            <div
              className="text-preview-product"
              style={{ maxWidth: editPreview ? "300px" : "500px" }}
            >
              <Typography
                color={color}
                style={{ fontWeight: "bolder", wordBreak: "break-word" }}
              >
                {products[activeIndex].name}
              </Typography>
              <Typography
                color={color}
                style={{
                  wordBreak: "break-word",
                  textAlign: "left",
                  marginTop: ".1rem",
                }}
              >
                {products[activeIndex].description}
              </Typography>
              <PriceOffer
                color={color}
                products={products}
                activeIndex={activeIndex}
              />
            </div>
            <ProductButton
              elemInfo={elemInfo}
              textColor={textColor}
              products={products}
              activeIndex={activeIndex}
            />
          </div>
          {products.filter((prod) => prod.show).length > 1 && (
            <button
              onClick={nextSlide}
              className="carouselA__btn carouselA__btn--next"
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Carousel;
