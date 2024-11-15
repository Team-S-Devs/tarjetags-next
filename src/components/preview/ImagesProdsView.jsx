import React, { useState, useEffect } from "react";
import { TRANSPARENT_SQUARE } from "../../utils/constants";
import Image from "next/image";

const ImagesProdsView = ({ images = [], editPreview = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getImageFromProduct = () => {
    if (images[activeIndex].url !== "") return images[activeIndex].url;
    else return TRANSPARENT_SQUARE;
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

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
        handleNext();
      } else if (difference < -threshold) {
        handlePrev();
      }
    }
    setStartX(null);
    setEndX(null);
  };

  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);

  return (
    <>
      {images.length > 0 && images[activeIndex] != null ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={getImageFromProduct()}
            alt={`Slide ${activeIndex}`}
            className="carouselA__img"
            style={{
              maxWidth: editPreview ? "200px" : "inherit",
              maxHeight: editPreview ? "200px" : "inherit",
            }}
            width={800}
            height={800}
          />
          {images.length > 1 && (
            <div className="prodImages-buttons">
              <button onClick={handlePrev} className="">
                &lt;
              </button>
              <button onClick={handleNext} className="">
                &gt;
              </button>
            </div>
          )}
        </div>
      ) : (
        <Image
          src={TRANSPARENT_SQUARE}
          alt={`Slide ${activeIndex}`}
          className="carouselA__img"
          style={{
            maxWidth: editPreview ? "200px" : "inherit",
            maxHeight: editPreview ? "200px" : "inherit",
          }}
          width={800}
          height={800}
        />
      )}
    </>
  );
};

export default ImagesProdsView;
