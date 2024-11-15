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
import { handleUploadStoreImage } from "../../utils/methods";
import HorizontalLine from "../lines/HorizontalLine";
import StoreProductPrice from "../store/StoreProductPrice";
import StoreButtonAction from "../store/StoreButtonAction";
import StoreCategorySelector from "../store/StoreCategorySelector";

const StoreProductModal = ({
  open,
  setOpen,
  products = [],
  setProducts,
  index,
  categories = [],
}) => {
  const [userInfoCop, setUserInfoCop] = useState({});
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const imgsArray = products[index]?.imgs;
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
    const productsCopy = [...products];
    productsCopy[index][key] = val;
    setProducts(productsCopy);
  };

  const handleSaveProduct = async () => {
    let imgUrlsCopy = [];
    setLoading(true);
    try {
      for (let i = 0; i < imgUrls.length; i++) {
        if (imgUrls[i].file) {
          let imageStatus = await handleUploadStoreImage(
            imgUrls[i].file,
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
    let productsCop = [...products];
    productsCop[index].imgs = imgUrlsCopy;
    setOpen(false);
    setProducts(products);
  };

  const { width } = useWindowSize();

  return (
    <>
      {open && products.length > 0 && products[index] ? (
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
                  checked={!products[index].show}
                  onChange={() => {
                    handleEditProduct(!products[index].show, "show");
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
              value={products[index]?.name}
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
              value={products[index]?.description}
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
            <ProductPhotos imageUrls={imgUrls} setImageUrls={setImgUrls} />

            <div style={{ marginTop: 18 }}></div>
            <StoreCategorySelector
              products={products}
              setProducts={setProducts}
              categories={categories}
              index={index}
            />

            <div style={{ marginTop: 18 }}></div>

            <HorizontalLine />
            <StoreProductPrice
              products={products}
              setProducts={setProducts}
              index={index}
              keyProduct="price"
            />

            <StoreProductPrice
              products={products}
              setProducts={setProducts}
              index={index}
              keyProduct="offerPrice"
              label="Precio de oferta:"
            />

            <div style={{ marginTop: 18 }}></div>

            <HorizontalLine />

            <StoreButtonAction
              products={products}
              setProducts={setProducts}
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

export default StoreProductModal;
