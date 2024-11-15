import React from "react";
import ThinTitle from "../components/texts/ThinTitle";
import ProductsServicesCategories from "./ProductsServicesCategories";
import ProductsServicesList from "./ProductsServicesList";
import { LICENSE_TYPES, licenseLimits } from "../utils/constants";
import { FaLock } from "react-icons/fa";

const ProductsServicesTab = ({
  elementsInfo = {
    title: "",
    description: "",
    socialLinks: [],
    productCategories: [],
    products: [],
  },
  setElementsInfo,
  cardId,
  licenseType = "",
  setOpenUpdate,
}) => {
  const updatePress = () => {
    if (!licenseLimits[licenseType].productsDivision)
      setOpenUpdate(LICENSE_TYPES.PREMIUM);
  };

  return (
    <div>
      <div onClick={updatePress}>
        <div className="mt-4">
          <ThinTitle
            variant="h5"
            color={
              !licenseLimits[licenseType].productsDivision ? "gray" : "primary"
            }
            textAlign="center"
          >
            División de productos y/o servicios
            {!licenseLimits[licenseType].productsDivision && (
              <FaLock style={{ marginLeft: 20, cursor: "pointer" }} />
            )}
          </ThinTitle>
        </div>
        <div className="mt-3">
          <ProductsServicesCategories
            elementsInfo={elementsInfo}
            setElementsInfo={setElementsInfo}
            licenseType={licenseType}
            setOpenUpdate={setOpenUpdate}
            disabled={!licenseLimits[licenseType].productsDivision}
          />
        </div>
      </div>
      <br />
      <div className="mt-4" style={{ marginTop: 400 }}>
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Productos y/o servicios
        </ThinTitle>
      </div>
      <div className="mt-3">
        <ProductsServicesList
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
          cardId={cardId}
          licenseType={licenseType}
          setOpenUpdate={setOpenUpdate}
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default ProductsServicesTab;
