import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
} from "@mui/material";

const ColorThemeDialog = ({
  open,
  onClose,
  elementsInfo = { color: "" },
  setElementsInfo,
}) => {
  const [selectedColor, setSelectedColor] = useState(elementsInfo.color);

  const themeColors = [
    "#2196F3", // Blue
    "#FF5722", // Deep Orange
    "#4CAF50", // Green
    "#FFC107", // Amber
    "#E91E63", // Pink
    "#607D8B", // Blue Grey
    "#561AD9", // Purple
    "#795548", // Brown
    "#B710C2", // Yellow
    "#00BCD4", // Cyan
    "#F44336", // Red
    "#3F51B5", // Indigo
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSave = () => {
    if (selectedColor) {
      setElementsInfo({ ...elementsInfo, color: selectedColor });
      onClose();
    } else {
      alert("Selecciona un tema de color antes de guardar");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selecciona tu tema de color</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {themeColors.map((color) => (
            <Grid
              item
              key={color}
              xs={3}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <IconButton
                style={{
                  backgroundColor: color,
                  width: selectedColor === color ? "55px" : "44px",
                  height: selectedColor === color ? "55px" : "44px",
                  borderRadius: "8px",
                  border: selectedColor === color ? "2px solid #444" : "none",
                }}
                onClick={() => handleColorSelect(color)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorThemeDialog;
