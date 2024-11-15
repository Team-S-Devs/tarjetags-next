import React, { useState } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import { PiImageThin } from "react-icons/pi";
import useWindowSize from "../../hooks/useWindowsSize";
import { truncateString, validateImage } from "../../utils/methods";
import HorizontalLine from "../lines/HorizontalLine";
import { licenseLimits, MAIN_COLOR } from "../../utils/constants";
import Image from "next/image";

const ProductPhotos = ({
  imageUrls = [],
  setImageUrls = () => {},
  text = "Imagen seleccionada:",
  label,
  licenseType = "",
}) => {
  /**
   * Handles the drop event for the image file.
   * @param {Object} e - The drop event.
   */
  const handleDrop = (e) => {
    setBorderColor("#ccc");
    e.preventDefault();
    /* if (file) return; */
    const imageFiles = e.dataTransfer.files;
    let imgUrls = [];
    const idMax = Date.now();
    const maxImagesLength =
      licenseLimits[licenseType].limitImagesPerProduct > imageFiles.length
        ? imageFiles.length
        : licenseLimits[licenseType].limitImagesPerProduct;
    for (let i = 0; i < maxImagesLength; i++) {
      if (!validateImage(imageFiles[i])) {
        imageFiles.splice(i, 1);
        continue;
      }
      imgUrls.push({
        url: URL.createObjectURL(imageFiles[i]),
        file: imageFiles[i],
        id: idMax + i,
      });
    }
    setImageUrls([...imageUrls, ...imgUrls]);
  };

  /**
   * Handles the file selection event.
   * @param {Object} e - The file selection event.
   */
  const handleFileSelect = (e) => {
    const imageFiles = e.target.files;
    let imgUrls = [];
    const idMax = Date.now();
    const maxImagesLength =
      licenseLimits[licenseType].limitImagesPerProduct > imageFiles.length
        ? imageFiles.length
        : licenseLimits[licenseType].limitImagesPerProduct;
    for (let i = 0; i < maxImagesLength; i++) {
      if (!validateImage(imageFiles[i])) {
        imageFiles.splice(i, 1);
        continue;
      }
      imgUrls.push({
        url: URL.createObjectURL(imageFiles[i]),
        file: imageFiles[i],
        id: idMax + i,
      });
    }
    setImageUrls([...imageUrls, ...imgUrls]);
  };

  const [borderColor, setBorderColor] = useState("#ccc");

  /**
   * Handles the drag-over event.
   * @param {Object} e - The drag-over event.
   */
  const handleOnDragOver = (e) => {
    e.preventDefault();
    /* if (file !== "") return; */
    setBorderColor(MAIN_COLOR);
  };

  /**
   * Handles the drag-out event.
   * @param {Object} e - The drag-out event.
   */
  const handleOnDragOut = (e) => {
    e.preventDefault();
    setBorderColor("#ccc");
  };

  /**
   * Deletes the currently selected image.
   */
  const deleteImage = (idx) => {
    const igmUrlsCopy = imageUrls.filter((_, index) => index !== idx);
    setImageUrls(igmUrlsCopy);
  };

  const { width } = useWindowSize();

  return (
    <div style={{ margin: 0, marginTop: 12, marginBottom: 24 }}>
      <Box
        onDrop={handleDrop}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragOut}
        p={3}
        textAlign="center"
        borderTop={2}
        borderBottom={2}
        borderLeft={2}
        borderRight={2}
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          borderRadius: "6px",
          borderColor: borderColor,
          borderStyle: "dashed",
        }}
      >
        {imageUrls.map((url, idx) => (
          <>
            {imageUrls[idx].file && (
              <Box mb={2}>
                <Typography>
                  {text}{" "}
                  {imageUrls[idx].file.name &&
                    truncateString(imageUrls[idx].file.name)}
                </Typography>
              </Box>
            )}
            <Image
              src={url.url}
              alt={label}
              width={800}
              height={800}
              style={{ maxHeight: 200, width: "auto", maxWidth: "100%" }}
            />
            <IconButton onClick={() => deleteImage(idx)}>
              <IoCloseSharp />
            </IconButton>
            <HorizontalLine />
            <div style={{ marginBottom: 28 }} />
          </>
        ))}
        {licenseLimits[licenseType].limitImagesPerProduct >
          imageUrls.length && (
          <>
            <Box mb={2} mt={2}>
              <PiImageThin size={64} color={MAIN_COLOR} />
              {width > 1200 && (
                <>
                  <Typography color={"#333"}>
                    Arrastra y suelta tus imágenes aquí
                  </Typography>
                  <Typography color={"#333"}>o</Typography>
                </>
              )}
            </Box>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <label htmlFor="contained-button-file">
              <Button variant="outlined" component="span">
                Selecciona imágenes desde tu dispositivo
              </Button>
            </label>
          </>
        )}
      </Box>
    </div>
  );
};

export default ProductPhotos;
