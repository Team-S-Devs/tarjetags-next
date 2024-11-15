import {
  Button,
  CircularProgress,
  Dialog,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowsSize";
import ProductPhotos from "../product/ProductPhotos";
import CategorySelector from "../product/CategorySelector";
import { handleUploadImage } from "../../utils/methods";
import ProductPrice from "../product/ProductPrice";
import ButtonAction from "../product/ButtonAction";
import HorizontalLine from "../lines/HorizontalLine";

const ProductModal = ({
  open,
  setOpen,
  elementsInfo,
  setElementsInfo,
  index,
  cardId,
  licenseType = "",
}) => {
  const [userInfoCop, setUserInfoCop] = useState({});
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserInfoCop(elementsInfo);
  }, [elementsInfo]);

  useEffect(() => {
    const imgsArray = elementsInfo.products[index]?.imgs;
    let imgsUrlsCop = [];
    if (imgsArray) {
      for (let i = 0; i < imgsArray.length; i++) {
        imgsUrlsCop.push({
          id: imgsArray[i].id,
          url: imgsArray[i].url,
        });
      }
    }
    setImgUrls(imgsUrlsCop);
  }, [index]);

  const handleEditProduct = (val, key) => {
    const userInfoCopy = { ...userInfoCop };
    userInfoCopy.products[index][key] = val;
    setUserInfoCop(userInfoCopy);
  };

  const handleSaveProduct = async () => {
    let imgUrlsCopy = [];
    setLoading(true);
    try {
      for (let i = 0; i < imgUrls.length; i++) {
        if (imgUrls[i].file) {
          let imageStatus = await handleUploadImage(
            imgUrls[i].file,
            elementsInfo,
            cardId,
            imgUrls[i].id,
            "products"
          );
          if (!imageStatus.success) {
            alert("No se pudo subir una imagen, intenta de nuevo.");
          } else {
            imgUrlsCopy.push({
              id: imgUrls[i].id,
              url: imageStatus.url,
            });
          }
        } else {
          imgUrlsCopy.push({
            id: imgUrls[i].id,
            url: imgUrls[i].url,
          });
        }
      }
    } catch (e) {
      setLoading(false);
    }
    setLoading(false);
    let userInf = { ...userInfoCop };
    userInf.products[index].imgs = imgUrlsCopy;
    setOpen(false);
    setElementsInfo(userInf);
  };

  const { width } = useWindowSize();

  return (
    <>
      {open &&
      elementsInfo.products.length > 0 &&
      elementsInfo.products[index] ? (
        <Dialog open={open} onClose={handleSaveProduct} style={{ margin: 0 }}>
          <Dialog open={loading}>
            <div style={{ padding: 30, textAlign: "center" }}>
              <Typography>Subiendo imágenes...</Typography>
              <div className="mt-3"></div>
              <CircularProgress />
            </div>
          </Dialog>
          <div style={{ padding: width > 768 ? 40 : 16 }}>
            <Typography variant="h5">Editar Producto o Servicio</Typography>
            <br />
            <FormControlLabel
              control={
                <Switch
                  checked={!elementsInfo.products[index].show}
                  onChange={() => {
                    handleEditProduct(
                      !elementsInfo.products[index].show,
                      "show"
                    );
                  }}
                />
              }
              label={"Ocultar producto"}
            />
            <br />
            <br />
            <TextField
              label="Nombre del producto o servicio:"
              placeholder=""
              value={userInfoCop.products[index]?.name}
              onChange={(e) => handleEditProduct(e.target.value, "name")}
              fullWidth
              required
              inputProps={{
                maxLength: 70,
              }}
              style={{
                marginTop: 4,
                marginBottom: 18,
              }}
            />
            <TextField
              label="Descripción del producto o servicio:"
              placeholder=""
              value={userInfoCop.products[index]?.description}
              onChange={(e) => handleEditProduct(e.target.value, "description")}
              fullWidth
              required
              minRows={2}
              multiline
              inputProps={{
                maxLength: 320,
              }}
              style={{
                marginBottom: 6,
              }}
            />
            <ProductPhotos
              imageUrls={imgUrls}
              setImageUrls={setImgUrls}
              licenseType={licenseType}
            />

            <div style={{ marginTop: 18 }}></div>
            <CategorySelector
              userInfo={userInfoCop}
              setUserInfo={setUserInfoCop}
              index={index}
            />

            <div style={{ marginTop: 18 }}></div>

            <HorizontalLine />
            <ProductPrice
              elementsInfo={elementsInfo}
              setElementsInfo={setElementsInfo}
              index={index}
              keyProduct="price"
            />

            <ProductPrice
              elementsInfo={elementsInfo}
              setElementsInfo={setElementsInfo}
              index={index}
              keyProduct="offerPrice"
              label="Precio de oferta:"
            />

            <div style={{ marginTop: 18 }}></div>

            <HorizontalLine />

            <ButtonAction
              elementsInfo={elementsInfo}
              setElementsInfo={setElementsInfo}
              index={index}
            />

            <Button
              variant="contained"
              color="primary"
              style={{ fontSize: 15, marginTop: 32 }}
              onClick={handleSaveProduct}
            >
              Guardar
            </Button>
          </div>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductModal;
