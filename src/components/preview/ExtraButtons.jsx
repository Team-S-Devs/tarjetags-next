import { Button } from "@mui/material";
import React from "react";
import { GREY_RECTANGLE } from "../../utils/constants";
import Image from "next/image";

const ExtraButtons = ({ elementsInfo = {}, smallPreview }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: smallPreview ? "10px 24px" : "10px 32px",
        marginTop: 20
      }}
    >
      {elementsInfo.extraButtons?.map((button) => (
        <Button
          key={button.id}
          variant="contained"
          fullWidth
          style={{
            background: elementsInfo.theme === "dark" ? "#111" : "#FFF",
            color: elementsInfo.theme === "dark" ? "#fefefe" : "#000",
            display: "flex",
            justifyContent: "flex-start",
            padding: 5,
            paddingLeft: 10,
            paddingRight: 16,
            borderRadius: 40,
            fontSize: smallPreview ? 15.2 : 18.2,
            marginTop: smallPreview ? 12 : 20
          }}
          startIcon={
            <Image
              src={button.imgUrl !== "" ? button.imgUrl : GREY_RECTANGLE}
              width={44}
              height={44}
              style={{
                marginRight: 12,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          }
        >
          {button.name}
        </Button>
      ))}
    </div>
  );
};

export default ExtraButtons;
