import React from "react";
import "../../assets/styles/Prices/ButtonTableCompare.css";
import "../../assets/styles/Prices/CarouselButtons.css";
import ButtonCardPrice from "./ButtonCardPrice";
import { PHONE_NUMBER, SITE_NAME } from "../../utils/constants";

const ButtonTableComparison = (props) => {
  const obtenerSaludo = () => {
    const horaActual = new Date().getHours();

    if (horaActual >= 5 && horaActual < 12) {
      return "Buenos%20días";
    } else if (horaActual >= 12 && horaActual < 18) {
      return "Buenas tardes";
    } else {
      return "Buenas%20noches";
    }
  };

  const getWppLink = () => {
    return `https://wa.me/591${PHONE_NUMBER}?text=${obtenerSaludo()}.%20Deseo adquirir la Licencia ${
      props.title
    } de ${SITE_NAME} para mi cuenta cuyo correo es: ${props.user?.email}`;
  };

  return (
    <>
      <div className="button-carousel">
        <div className="text-button-table-compare">
          <h5 className="title-button">{props.title}</h5>
          <div className="text-container-price">
            <p className="text-price-table">
              {props.currency} {props.amount}
            </p>
          </div>
        </div>
        <div className="button-container-carousel">
          {props.title !== "Gratis" && (
            <ButtonCardPrice href={getWppLink()} width={100} height={35} />
          )}
        </div>
      </div>
    </>
  );
};

export default ButtonTableComparison;
