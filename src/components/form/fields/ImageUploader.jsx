import React, { useEffect, useState } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import {
  IoCloudUploadOutline,
  IoCloseSharp,
  IoImageOutline,
} from "react-icons/io5";
import { truncateString } from "../../../utils/methods";
import useWindowSize from "../../../hooks/useWindowsSize";
import { PiImageThin } from "react-icons/pi";
import { MAIN_COLOR } from "../../../utils/constants";
import Image from "next/image";

const allowedFormats = [
  "image/bmp",
  "image/tiff",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/svg",
  "image/webp",
];
const maxSize = 5 * 1024 * 1024;

/**
 * ImageUploader component for uploading images with drag-and-drop functionality.
 * @component
 * @param {Object} props - The component props.
 * @param {File} props.file - The currently selected image file.
 * @param {function} props.setFile - The callback function to set the image file.
 * @param {function} props.imageUrl - The callback function to set the image file.
 * @param {function} props.setImageUrl - The callback function to set the image file.
 * @param {string} [props.text="Selected image:"] - The text to display when an image is selected.
 * @param {string} props.errorMsg - The error message to display.
 * @param {function} props.handleErrorMsg - The callback function to handle error messages.
 * @returns {JSX.Element} - The rendered ImageUploader component.
 */
const ImageUploader = ({
  file,
  setFile,
  imageUrl,
  setImageUrl,
  text = "Imagen seleccionada:",
  errorMsg = "",
  handleErrorMsg = () => {},
  label,
}) => {
  /**
   * Validates the selected image file based on allowed formats and maximum size.
   * @param {File} file - The selected image file.
   * @returns {boolean} - True if the file is valid, false otherwise.
   */
  const validateImage = (file) => {
    if (!file) return true;
    if (!allowedFormats.includes(file.type)) {
      handleErrorMsg(
        "image",
        "Invalid image file format, allowed formats are: BMP, TIFF, JPEG, GIF, PNG, SVG and WEBP"
      );
      return false;
    } else if (file.size > maxSize) {
      handleErrorMsg(
        "image",
        "Invalid image file size, maximum size allowed is 5MB"
      );
      return false;
    }
    return true;
  };

  /**
   * Handles the drop event for the image file.
   * @param {Object} e - The drop event.
   */
  const handleDrop = (e) => {
    setBorderColor("#ccc");
    e.preventDefault();
    if (file) return;
    const imageFile = e.dataTransfer.files[0];
    setFile(imageFile);
    if (!validateImage(imageFile)) return;
    setImageUrl(URL.createObjectURL(imageFile));
    handleErrorMsg("image", "");
  };

  /**
   * Handles the file selection event.
   * @param {Object} e - The file selection event.
   */
  const handleFileSelect = (e) => {
    if (file) return;
    const imageFile = e.target.files[0];
    setFile(imageFile);
    if (!validateImage(imageFile)) return;
    setImageUrl(URL.createObjectURL(imageFile));
    handleErrorMsg("image", "");
  };

  const [borderColor, setBorderColor] = useState("#ccc");

  /**
   * Handles the drag-over event.
   * @param {Object} e - The drag-over event.
   */
  const handleOnDragOver = (e) => {
    e.preventDefault();
    if (file !== "") return;
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
  const deleteImage = () => {
    setFile("");
    setImageUrl(null);
    handleErrorMsg("imgUrl", "");
  };

  const { width } = useWindowSize();

  return (
    <div>
      <Typography
        marginLeft={0.4}
        variant="subtitle1"
        color={"#666"}
        fontSize={"1.07em"}
        marginTop={2}
        marginBottom={0.3}
      >
        {label}
      </Typography>
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
        {imageUrl ? (
          <>
            {file && (
              <Box mb={2}>
                <Typography>
                  {text} {file.name && truncateString(file.name)}
                </Typography>
              </Box>
            )}
            <Image
              src={imageUrl}
              alt={label}
              style={{ maxHeight: 200, width: "auto", maxWidth: "100%" }}
              width={800}
              height={800}
            />
            <IconButton onClick={deleteImage}>
              <IoCloseSharp />
            </IconButton>
          </>
        ) : (
          <>
            <Box mb={2} mt={2}>
              <PiImageThin size={64} color={MAIN_COLOR} />
              {width > 1200 && (
                <>
                  <Typography color={"#333"}>
                    Arrastra y suelta tu imagen aquí
                  </Typography>
                  <Typography color={"#333"}>o</Typography>
                </>
              )}
            </Box>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <label htmlFor="contained-button-file">
              <Button variant="outlined" component="span">
                Selecciona una imagen desde tu dispositivo
              </Button>
            </label>
          </>
        )}
      </Box>
      <br />
      {errorMsg !== "" && (
        <Typography
          marginLeft={6}
          color={"error"}
          variant="body2"
          textAlign={"left"}
        >
          {errorMsg}
        </Typography>
      )}
    </div>
  );
};

export default ImageUploader;
