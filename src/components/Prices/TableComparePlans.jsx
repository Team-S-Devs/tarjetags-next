import React from "react";
import "../../assets/styles/Prices/TableCompare.css";
import ColumPrice from "./ColumPrice";
import ColumnTextBenefit from "./ColumnTextBenefit";
import Flickity from "flickity";
import { useRef, useEffect, useState } from "react";
import "flickity/css/flickity.css";
import ButtonTableComparison from "./ButtonTableComparison";
import "../../assets/styles/Prices/CarouselButtons.css";
import plans from "../../utils/plans.json";

function TableComparePlans({ user = { email: "" } }) {
  const carouselRef = useRef(null);
  const flickityInstance = useRef(null);
  const [displayCells, setDisplayCells] = useState([false, true, false]);
  let cellsReseted = false;

  useEffect(() => {
    flickityInstance.current = new Flickity(carouselRef.current, {
      wrapAround: window.innerWidth <= 443,
      autoplay: true,
      prevNextButtons: false,
      initialIndex: 1,
      pageDots: true,
    });
    flickityInstance.current.resize();

    const handleResize = () => {
      if (window.innerWidth > 767) {
        setDisplayCells(Array(3).fill(true));
        cellsReseted = false;
      } else {
        if (!cellsReseted) {
          setDisplayCells([false, false, true]);
          flickityInstance.current.select(1);
          cellsReseted = true;
        }
      }

      flickityInstance.current.options.wrapAround = window.innerWidth <= 443;
      flickityInstance.current.resize();
    };

    const handleSlideChange = (index) => {
      handleCellClick(index);
    };

    flickityInstance.current.on("change", handleSlideChange);
    window.addEventListener("resize", handleResize);

    if (window.innerWidth > 958) {
      setDisplayCells(Array(3).fill(true));
    }

    return () => {
      flickityInstance.current.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCellClick = (index) => {
    flickityInstance.current.select(index);
    setDisplayCells((prevCells) => {
      const newCells = Array(prevCells.length).fill(false);
      newCells[index] = true;
      return newCells;
    });
  };

  const getTitlePlanById = (idPlan) => {
    const currentPlan = plans.find((plan) => plan.idPlan == idPlan);
    return currentPlan.namePlan;
  };

  const getAmountById = (idPlan) => {
    const currentPlan = plans.find((plan) => plan.idPlan == idPlan);
    return currentPlan.pricePlan;
  };

  return (
    <div className="TableCompare-container" style={{ overflowX: "hidden", paddingTop: "16px" }}>
      <h2 className="tittle-text-table"  style={{ overflowX: "hidden", marginTop:24 }}>
        ELIGE EL PLAN QUE MAS SE ADAPTE A TUS NECESIDADES
      </h2>
      <div className="carousel" ref={carouselRef} style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <div className="carousel-cell" onClick={() => handleCellClick(0)}>
          <ButtonTableComparison
            title={getTitlePlanById(1)}
            currency="Bs"
            amount={getAmountById(1)}
            user={user}
          />
        </div>
        <div className="carousel-cell" onClick={() => handleCellClick(1)}>
          <ButtonTableComparison
            title={getTitlePlanById(2)}
            currency="Bs"
            amount={getAmountById(2)}
            user={user}
          />
        </div>
        <div className="carousel-cell" onClick={() => handleCellClick(2)}>
          <ButtonTableComparison
            title={getTitlePlanById(3)}
            currency="Bs"
            amount={getAmountById(3)}
            user={user}
          />
        </div>
      </div>
      <div className="table-container" style={{ overflowX: "hidden" }}>
        <ColumnTextBenefit />
        {displayCells[0] ? <ColumPrice idPlan="1" /> : null}
        {displayCells[1] ? <ColumPrice idPlan="2" /> : null}
        {displayCells[2] ? <ColumPrice idPlan="3" /> : null}
      </div>
    </div>
  );
}

export default TableComparePlans;
