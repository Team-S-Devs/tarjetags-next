import React from "react";
import { GREY_RECTANGLE } from "../../utils/constants";
import lightPurpleSvg from "../../assets/images/light-purple.svg";
import Image from "next/image";

const PhotosHeader = ({ elementsInfo = {}, smallPreview = false }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={
          elementsInfo.coverPhoto && elementsInfo.coverPhoto.url !== ""
            ? elementsInfo.coverPhoto.url
            : GREY_RECTANGLE
        }
        style={{
          width: "100%",
          height: "auto",
          maxHeight: !smallPreview ? "210px" : "150px",
          objectFit: "cover",
        }}
        alt="Foto de portada"
        width={800}
        height={800}
      />
      <br />
      <Image
        src={
          elementsInfo.profilePhoto?.url &&
          elementsInfo.profilePhoto?.url !== ""
            ? elementsInfo.profilePhoto.url
            : lightPurpleSvg
        }
        style={{
          height: !smallPreview ? "180px" : "120px",
          width: !smallPreview ? "180px" : "120px",
          borderRadius: "50%",
          margin: "12px",
          marginBottom: "0px",
          objectFit: "cover",
          border: "4px solid white",
          marginTop: "-90px",
          zIndex: 1,
        }}
        alt={`Foto de perfil`}
        width={800}
        height={800}
      />
    </div>
  );
};

export default PhotosHeader;
