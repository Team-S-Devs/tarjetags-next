import React from "react";
import "../../assets/styles/Prices/BannerTittle.css";
import { BsGlobe } from "react-icons/bs";
import { BsWindowStack } from "react-icons/bs";
import { BsTrophy } from "react-icons/bs";
import Image from "next/image";

const MiComponente = () => {
  return (
    <div className="background">
      <div className="images-container">
        <Image
          src="https://i.postimg.cc/FFkqrfd6/Untitled-1-1920x979.png"
          alt="img-plans"
          className="img-plans"
          draggable="false"
          width={800}
          height={800}
        />
      </div>
      <div className="text-container">
        <h2>PLANES PRECIOS</h2>
        <h3>Elige tu plan y comienza a crecer</h3>
        <div className="benefits-container">
          <div className="benefits">
            <BsGlobe className="icon" />
            <h4>Nombre de dominio personalizado</h4>
          </div>
          <div className="benefits">
            <BsWindowStack className="icon" />
            <h4>Libre de anuncios</h4>
          </div>
          <div className="benefits">
            <BsTrophy className="icon" />
            <h4>Impulsa tu alcanse</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiComponente;
