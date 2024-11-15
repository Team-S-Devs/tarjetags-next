import React from "react";
import benefitList from "../../utils/BenefitList.json";

const ColumnTextBenefit = () => {
  const blockBenefit = () => {
    return benefitList.benefits.map((benefit, index) => (
      <div key={index} className="box-content text-benefit">
        <div className="divisor-line"></div>
        <h6>{benefit.name}</h6>
        <p className="text-description">{benefit.description}</p>
      </div>
    ));
  };
  return (
    <div className="column-price ">
      <div className="box-content-top ">
        <h5>Beneficios</h5>
      </div>
      {blockBenefit()}
    </div>
  );
};

export default ColumnTextBenefit;
