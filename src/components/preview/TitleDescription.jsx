import React from "react";
import ThinTitle from "../texts/ThinTitle";
import { Typography } from "@mui/material";

const TitleDescription = ({ elementsInfo = {}, smallPreview = false, textColor = "#fff" }) => {
  return (
    <div>
      <ThinTitle
        variant={smallPreview ? "h5" : "h3"}
        textAlign="center"
        color={elementsInfo.theme === "dark" ? "#fff" : "#000"}
        style={{
          textOverflow: "ellipsis",
          lineHeight: smallPreview ? "36px" : "64px",
          fontSize: smallPreview ? "2em" : "3em",
          padding: "0 28px",
          wordBreak: "break-word",
        }}
      >
        {elementsInfo.title}
      </ThinTitle>
      <Typography
        textAlign={"left"}
        color={elementsInfo.theme === "dark" ? "#ddd" : "#333"}
        fontSize={smallPreview ? "1em" : "1.2em"}
        marginTop={3}
        marginBottom={smallPreview ? 4 : 5}
        style={{
          padding: "0 28px",
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {elementsInfo.description}
      </Typography>
      <div>
        <Typography
          textAlign={"left"}
          fontSize={smallPreview ? "1em" : "1.2em"}
          color={textColor}
          marginBottom={2}
          style={{
            backgroundColor: elementsInfo.color,
            marginTop: 4,
            marginLeft: smallPreview ? 22 : 28,
            marginRight: smallPreview ? 22 : 28,
            padding: "20px 28px",
            borderRadius: "12px",
            wordBreak: "break-word",
          }}
        >
          {elementsInfo.companyDescription}
        </Typography>
      </div>
    </div>
  );
};

export default TitleDescription;
