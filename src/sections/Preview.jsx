import React, { useEffect, useState } from "react";
import { licenseLimits, MAIN_COLOR, SITE_NAME } from "../utils/constants";
import PhotosHeader from "../components/preview/PhotosHeader";
import useWindowSize from "../hooks/useWindowsSize";
import TitleDescription from "../components/preview/TitleDescription";
import SocialLinks from "../components/preview/SocialLinks";
import ContactLinks from "../components/preview/ContactLinks";
import ExtraButtons from "../components/preview/ExtraButtons";
import chroma from "chroma-js";
import AdminPreview from "../components/preview/AdminPreview";
import "../assets/styles/dashboard.css";
import ThinTitle from "../components/texts/ThinTitle";
import ProductsView from "../components/preview/ProductsView";
import lightPurpleSvg from "../assets/images/light-purple.svg";
import Head from "next/head";

const Preview = ({
  elementsInfo = {},
  borderRadius = 0,
  licenseType,
  editPreview = false,
}) => {
  const color = elementsInfo.theme === "dark" ? "#FFF" : "#000";
  const backgroundColor = elementsInfo.theme === "dark" ? "#25242B" : "#FFF";
  const { width } = useWindowSize();

  const smallPreview = width < 986 || editPreview;

  const [products, setProducts] = useState(elementsInfo.products);
  const [actualCategory, setActualCategory] = useState("0");
  const [indexCarousel, setIndexCarousel] = useState(0);

  // COLOR DE FONDO ESCOGIDO POR EL USUARIO
  const bgColor = elementsInfo.color ?? MAIN_COLOR;

  const contrastWithWhite = chroma.contrast(bgColor, "white");
  const contrastWithBlack = chroma.contrast(bgColor, "black");

  const customContrastThreshold = 3;

  // COLOR DEL TEXTO USANDO EL FONDO ESCOGIDO POR EL USUARIO
  const textColor =
    contrastWithWhite > customContrastThreshold
      ? "#fff"
      : contrastWithBlack > customContrastThreshold
      ? "#000"
      : "#fff";

  useEffect(() => {
    if (actualCategory == "0") {
      setIndexCarousel(0);
      setProducts(
        elementsInfo.products?.slice(0, licenseLimits[licenseType].maxProducts)
      );
    } else {
      const categoryProducts = elementsInfo.products.filter(
        (prod) => prod.category == actualCategory
      );
      setIndexCarousel(0);
      setProducts(
        categoryProducts.slice(0, licenseLimits[licenseType].maxProducts)
      );
    }
  }, [actualCategory]);

  const changeCategory = (id) => {
    setActualCategory(id);
  };

  const isAProductVisible = () => {
    return elementsInfo.products.some((prod) => prod.show);
  };

  const isNotCategoryEmpty = (cat) => {
    return elementsInfo.products.some(
      (prod) => prod.category == cat.id && prod.show
    );
  };

  const getProfileUrl = () => {
    elementsInfo.profilePhoto?.url &&
          elementsInfo.profilePhoto?.url !== ""
            ? elementsInfo.profilePhoto.url
            : lightPurpleSvg
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        borderWidth: 2,
        borderRadius,
        overflow: "scroll",
        overflowX: "hidden",
        position: "relative",
        paddingLeft: smallPreview ? 0 : "28%",
        paddingRight: smallPreview ? 0 : "28%",
      }}
      className="preview-container"
    >
      <Head>
        <title>{elementsInfo.title}</title>
        <meta property="og:title" content={elementsInfo.title + " - " + SITE_NAME} />
        <meta property="og:description" content={elementsInfo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tarjetag.com" />
        <meta property="og:image" content={getProfileUrl} />
      </Head>

      <style>
        {`
          .preview-container::-webkit-scrollbar {
            width: ${smallPreview ? "5px" : "10px"};
            display: ${smallPreview && "none"}
          }
          .preview-container::-webkit-scrollbar-thumb {
            background: ${elementsInfo.color}
          }
          .preview-container::-webkit-scrollbar-track{
            background: ${backgroundColor}
          }
        `}
      </style>
      <PhotosHeader elementsInfo={elementsInfo} smallPreview={smallPreview} />
      <TitleDescription
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        textColor={textColor}
      />
      <SocialLinks elementsInfo={elementsInfo} smallPreview={smallPreview} />

      {elementsInfo.products?.length > 0 && isAProductVisible() && (
        <div className="products-preview-container">
          <ThinTitle
            style={{
              textOverflow: "ellipsis",
              lineHeight: smallPreview ? "36px" : "64px",
              fontSize: smallPreview ? "1.3em" : "1.8em",
              padding: "0 28px",
              wordBreak: "break-all",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 16,
              color: elementsInfo.theme === "dark" ? "#eee" : "#111",
            }}
          >
            Productos o Servicios
          </ThinTitle>

          {elementsInfo.productCategories && (
            <div className="table-wrapper">
              <style>{`
              .table-wrapper::-webkit-scrollbar-thumb {
                background-color: ${color};
                border-radius: 5px;
                }
          `}</style>
              <table className="scrollable-table">
                <thead></thead>
                <tbody>
                  <tr>
                    <td key={"categ-" + 0}>
                      <div
                        className={
                          "category_option" +
                          (actualCategory == "0" ? " selected-cat" : "")
                        }
                        onClick={() => changeCategory("0")}
                        style={{ color: color }}
                      >
                        Todo
                      </div>
                    </td>
                    {licenseLimits[licenseType].productsDivision &&
                      elementsInfo.productCategories.map(
                        (cat) =>
                          isNotCategoryEmpty(cat) && (
                            <td key={"categ-" + cat.id}>
                              <div
                                className={
                                  "category_option" +
                                  (actualCategory == cat.id
                                    ? " selected-cat"
                                    : "")
                                }
                                onClick={() => changeCategory(cat.id)}
                                style={{ color: color }}
                              >
                                {cat.title}
                              </div>
                            </td>
                          )
                      )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="carrousel-products">
            <ProductsView
              licType={licenseType}
              editPreview={editPreview}
              index={indexCarousel}
              products={products}
              elemInfo={elementsInfo}
              color={color}
              textColor={textColor}
            ></ProductsView>
          </div>
        </div>
      )}

      <ExtraButtons
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        textColor={textColor}
      />

      <AdminPreview
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        licenseType={licenseType}
      />

      <ContactLinks
        elementsInfo={elementsInfo}
        smallPreview={smallPreview}
        licenseType={licenseType}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export default Preview;
