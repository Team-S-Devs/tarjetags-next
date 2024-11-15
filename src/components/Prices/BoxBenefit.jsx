import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import "../../assets/styles/Prices/TableCompare.css";

const BoxBenefit = (props) => {
  const text = props.text;
  const iconType = props.iconType;
  const listButtons = props.listButtons;

  const getIconOfButton = (nameButton, key) => {
    if (nameButton === "Ninguno") {
      return <h6>Ninguno</h6>;
    } else if (nameButton === "Ilimitado") {
      return <h6>Todos</h6>;
    } else if (nameButton === "Ilimitado sin Whatsapp y Maps") {
      return <h6 style={{ textAlign: "center"}}>Todos menos WhatsApp y Maps</h6>;
    } else {
      return null;
    }
  };

  const blockButtons = () => {
    return (
      <div className="icons-container">
        {listButtons.map((element, index) => getIconOfButton(element, index))}
      </div>
    );
  };

  return (
    <div className="box-content">
      <div className="divisor-line divisior-line-column-price"></div>
      <div className="divisor-line-vertical"></div>
      {text ? (
        <h6>{text}</h6>
      ) : listButtons ? (
        blockButtons()
      ) : iconType === true ? (
        <BsCheckCircleFill className="icon-check" />
      ) : (
        <BsXCircleFill className="icon-check-negative" />
      )}
    </div>
  );
};

export default BoxBenefit;
