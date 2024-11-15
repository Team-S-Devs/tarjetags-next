import React from "react";
import "../../assets/styles/Prices/CardPrice.css";
import { BsCheckCircleFill } from "react-icons/bs";
import ButtonCardPrice from "./ButtonCardPrice";
import plans from "../../utils/plans.json";
import { PHONE_NUMBER, SITE_NAME } from "../../utils/constants";

const CardPrice = ({ idPlan, user }) => {
  const currentPlan = plans.find((plan) => plan.idPlan === idPlan);

  const blockDescription = () => {
    if (currentPlan.descripcion.length > 0) {
      return (
        <div className="benefits-price">
          {currentPlan.descripcion.map((benefit, index) => {
            return (
              <div key={index} className="benefit-price">
                <BsCheckCircleFill className="icon" />
                <h6 className="text-benefit">{benefit}</h6>
              </div>
            );
          })}
        </div>
      );
    }
  };

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
      currentPlan.namePlan
    } de ${SITE_NAME}, para mi cuenta cuyo correo es: ${user?.email}`;
  };

  return (
    <div className="card-price-container">
      <h3 className="card-tittle">{currentPlan.namePlan.toUpperCase()}</h3>
      <div className="card-price">
        <div className="ribbon left">
          <div className="price-content-text">
            <span>
              {currentPlan.pricePlan} {currentPlan.currency}
            </span>
          </div>
        </div>
      </div>

      {blockDescription()}
      <div className="button-container">
        {idPlan > 1 && <ButtonCardPrice href={getWppLink()} />}
      </div>
    </div>
  );
};

export default CardPrice;
