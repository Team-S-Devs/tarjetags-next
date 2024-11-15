import {
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { BiShareAlt } from "react-icons/bi";
import StyledCard from "../components/card/StyledCard";

const ShareButtonSwitch = ({
  elementsInfo = { showShareButton: true },
  setElementsInfo,
}) => {
  return (
    <StyledCard>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton color="primary">
            <BiShareAlt />
          </IconButton>
          <Typography marginLeft={2} variant="h6">{"Mostrar botón para compartir"}</Typography>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={elementsInfo.showShareButton}
              onChange={() => {
                setElementsInfo({
                  ...elementsInfo,
                  showShareButton: !elementsInfo.showShareButton,
                });
              }}
            />
          }
          label=""
        />
      </div>
    </StyledCard>
  );
};

export default ShareButtonSwitch;
