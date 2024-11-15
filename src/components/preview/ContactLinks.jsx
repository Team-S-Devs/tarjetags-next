import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  FULL_URL_NAME,
  licenseLimits,
  MAIN_COLOR,
  URL_NAME,
} from "../../utils/constants";
import { contactButtonsOptions } from "../../sections/ContactButtons";
import { LuShare2 } from "react-icons/lu";
import iconTag from "../../assets/images/auth/Marca.svg";
import Image from "next/image";

const ContactLinks = ({
  elementsInfo = {},
  smallPreview,
  licenseType,
  backgroundColor,
}) => {
  const [urlWithId, setUrlWithId] = useState("");

  useEffect(() => {
    const currentUrl = window.location.origin;
    const urlWithId = `${currentUrl}/${elementsInfo.urlPage}`;
    setUrlWithId(urlWithId);
  }, []);

  const shareURL = () => {
    if (navigator.share) {
      navigator.share({
        title: "Compartir URL",
        text: "Mira mi tarjeta digital",
        url: urlWithId,
      });
    } else {
      alert("No se puede compartir desde este navegador");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center social-links-container"
      style={{
        overflow: "auto",
        paddingLeft: "10px",
        padding: "15px 10px",
        margin: smallPreview ? "22px 0" : "42px 0",
        position: "sticky",
        bottom: 0,
        backgroundColor,
        width: "100%",
        boxShadow: "0px -5px 5px -5px rgba(140,140,140,0.3)",
      }}
    >
      <style>
        {`
          .social-links-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {elementsInfo.contactLinks?.filter(
          (button) =>
            !licenseLimits[licenseType].excludedButtons.includes(button.name)
        )
        .map((icon, index) => (
          <IconButton
            key={"iconButton-" + index}
            style={{
              background: "#fff",
              color: contactButtonsOptions.find(
                (option) => option.name === icon.name
              ).color,
              padding: 1,
              borderRadius: "50%",
              marginLeft: index !== 0 ? 16 : 0,
            }}
            href={
              icon.name === "WhatsApp"
                ? `https://wa.me/591${icon.url}`
                : icon.name === "E-mail"
                ? `mailto:${icon.url}`
                : icon.name === "Teléfono"
                ? `tel:${icon.url}`
                : icon.url
            }
            target="_blank"
          >
            <Image
              width={smallPreview ? 40 : 60}
              style={{ borderRadius: "50%" }}
              src={
                contactButtonsOptions.find(
                  (option) => option.name === icon.name
                ).img
              }
              height={smallPreview ? 40 : 60}
            />
          </IconButton>
        ))}
      {elementsInfo.showShareButton && (
        <IconButton
          style={{
            background: "#fff",
            color: "#000",
            padding: 8,
            paddingRight: 9,
            borderRadius: "50%",
            marginLeft: elementsInfo.contactLinks?.length > 0 ? 16 : 0,
          }}
          onClick={shareURL}
        >
          {/* <Image
              width={smallPreview ? 40 : 60}
              style={{ borderRadius: "50%" }}
              src={share}
            /> */}
          <LuShare2 size={smallPreview ? 24 : 44} />
        </IconButton>
      )}
      <IconButton
        style={{
          background: MAIN_COLOR,
          color: "#000",
          padding: 8,
          paddingRight: 11,
          borderRadius: "50%",
          marginLeft: elementsInfo.contactLinks?.length > 0 ? 16 : 0,
        }}
        href={FULL_URL_NAME}
        target="_blank"
      >
        <Image
          width={smallPreview ? 24 : 44}
          style={{ borderRadius: "50%" }}
          src={iconTag}
          height={smallPreview ? 24 : 44}
        />
      </IconButton>
    </div>
  );
};

export default ContactLinks;
