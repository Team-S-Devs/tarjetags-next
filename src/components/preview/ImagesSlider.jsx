import React, { useState, useEffect } from "react";
import { TRANSPARENT_SQUARE } from "../../utils/constants";
import Image from "next/image";

const ImagesSlider = ({ images = [], editPreview = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getImageFromProduct = () => {
    if (images[activeIndex].url != "") return images[activeIndex].url;
    else return TRANSPARENT_SQUARE;
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const [autoplay, setAutoplay] = useState(true); // Estado para controlar la reproducción automática
  const slideInterval = 2500; // Intervalo de tiempo entre cada cambio de slide (en milisegundos)

  useEffect(() => {
    // Función para avanzar al siguiente slide
    const nextSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Función para detener la reproducción automática
    const stopAutoplay = () => {
      setAutoplay(false);
    };

    // Función para iniciar la reproducción automática
    const startAutoplay = () => {
      setAutoplay(true);
    };

    // Si autoplay está activado, iniciar el intervalo para cambiar de slide automáticamente
    let slideTimer;
    if (autoplay) {
      slideTimer = setInterval(() => {
        nextSlide();
      }, slideInterval);
    }

    // Limpiar el intervalo cuando el componente se desmonta o cuando se desactiva el autoplay
    return () => {
      clearInterval(slideTimer);
    };
  }, [activeIndex, autoplay, images.length]);

  return (
    <>
      {images.length > 0 && images[activeIndex] != null ? (
        <Image
          src={getImageFromProduct()}
          alt={`Slide ${activeIndex}`}
          className="carouselA__img"
          style={{
            maxWidth: editPreview ? "200px" : "inherital",
            maxHeight: editPreview ? "200px" : "inherital",
          }}
          width={800}
          height={800}
        />
      ) : (
        <Image
          src={TRANSPARENT_SQUARE}
          alt={`Slide ${activeIndex}`}
          className="carouselA__img"
          style={{
            maxWidth: editPreview ? "200px" : "inherital",
            maxHeight: editPreview ? "200px" : "inherital",
          }}
          width={800}
          height={800}
        />
      )}
    </>
  );
};

export default ImagesSlider;
