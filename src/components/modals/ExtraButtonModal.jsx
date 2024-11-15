import { CircularProgress, Dialog, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowsSize";
import { handleUploadImage } from "../../utils/methods";
import ImageUploader from "../form/fields/ImageUploader";

const ExtraButtonModal = ({
  open,
  setOpen,
  elementsInfo,
  setElementsInfo,
  index,
  cardId,
}) => {
  const [userInfoCop, setUserInfoCop] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserInfoCop(elementsInfo);
  }, [elementsInfo]);

  const handleEditButton = (val, key) => {
    const userInfoCopy = { ...userInfoCop };
    userInfoCopy.extraButtons[index][key] = val;
    setUserInfoCop(userInfoCopy);
  };

  const handleSaveProduct = async () => {
    let userInf = { ...userInfoCop };
    setLoading(true);
    if (file) {
      try {
        let imageStatus = await handleUploadImage(
          file,
          elementsInfo,
          cardId,
          elementsInfo.extraButtons[index].id,
          "extraButtons"
        );
        if (!imageStatus.success) {
          alert("No se pudo subir una imagen, intenta de nuevo.");
        } else {
          userInf.extraButtons[index].imgUrl = imageStatus.url;
        }
      } catch (error) {
        setLoading(false);
      }
    }

    setLoading(false);
    setOpen(false);
    setElementsInfo(userInf);
  };

  const { width } = useWindowSize();

  return (
    <>
      {open &&
      elementsInfo.extraButtons.length > 0 &&
      elementsInfo.extraButtons[index] ? (
        <Dialog open={open} onClose={handleSaveProduct} style={{ margin: 0 }}>
          <Dialog open={loading}>
            <div style={{ padding: 30, textAlign: "center" }}>
              <Typography>Subiendo imagen...</Typography>
              <div className="mt-3"></div>
              <CircularProgress />
            </div>
          </Dialog>
          <div style={{ padding: width > 768 ? 40 : 16 }}>
            <Typography variant="h5">Editar Botón</Typography>
            <br />
            <ImageUploader
              file={file}
              setFile={setFile}
              imageUrl={elementsInfo.extraButtons[index]?.imgUrl}
              setImageUrl={(val) => handleEditButton(val, "imgUrl")}
              label="Imagen del botón:"
            />
            <TextField
              label="Texto del botón:"
              placeholder=""
              value={userInfoCop.extraButtons[index]?.name}
              onChange={(e) => handleEditButton(e.target.value, "name")}
              fullWidth
              required
              inputProps={{
                maxLength: 32,
              }}
              style={{
                marginTop: 4,
                marginBottom: 18,
              }}
            />
            <TextField
              label="URL:"
              placeholder=""
              helperText="URL donde se redirigirá al usuario al presionar el botón"
              value={userInfoCop.extraButtons[index]?.url}
              onChange={(e) => handleEditButton(e.target.value, "url")}
              fullWidth
              required
              multiline
              inputProps={{
                maxLength: 320,
              }}
              style={{
                marginBottom: 6,
              }}
            />

            {/* <Button
                variant="contained"
                color="primary"
                style={{ fontSize: 15, marginTop: 32 }}
                onClick={handleSaveProduct}
              >
                Guardar
              </Button> */}
          </div>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExtraButtonModal;
