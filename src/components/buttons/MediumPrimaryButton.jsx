import { Button, CircularProgress } from "@mui/material";
import React from "react";

const MediumPrimaryButton = ({
  children,
  onClick,
  type = "submit",
  loading = false,
  fullWidth,
  startIcon,
  fontSize = 16,
}) => (
  <Button
    style={{ fontSize }}
    onClick={onClick}
    type={type}
    variant="contained"
    disabled={loading}
    fullWidth={fullWidth}
    startIcon={startIcon}
  >
    {children}{" "}
    {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
  </Button>
);

export default MediumPrimaryButton;
