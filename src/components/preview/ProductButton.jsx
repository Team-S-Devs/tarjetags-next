import Link from "next/link";
import React from "react";

const ProductButton = ({
  products = [],
  activeIndex = 0,
  textColor,
  elemInfo,
}) => {
  const wppMessage = encodeURIComponent(
    products[activeIndex].buttonAction.wppMessage
  );

  return (
    <>
      {products[activeIndex].buttonAction.forWpp ? (
        <Link
          href={`https://wa.me/${products[activeIndex].buttonAction.wppNumber}?text=${wppMessage}`}
          target="_blank"
          className="obtain-preview-button"
          style={{
            backgroundColor: elemInfo.color,
            color: textColor,
          }}
        >
          {products[activeIndex].buttonAction.buttonText}
        </Link>
      ) : (
        <Link
          href={products[activeIndex].buttonAction.customUrl}
          target="_blank"
          className="obtain-preview-button"
          style={{
            backgroundColor: elemInfo.color,
            color: textColor,
          }}
        >
          {products[activeIndex].buttonAction.buttonText}
        </Link>
      )}
    </>
  );
};

export default ProductButton;
