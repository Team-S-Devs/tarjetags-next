import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import ThinTitle from "../components/texts/ThinTitle";
import { IconButton, Typography } from "@mui/material";
import { FaPhone } from "react-icons/fa";
import { GoGlobe, GoTrash } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import ContactMethodsDialog from "../components/modals/ContactMethodsDialog";
import { IoLogoWhatsapp, IoMail } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import email from "../assets/images/social/email.png";
import whatsapp from "../assets/images/social/whatsapp.png";
import web from "../assets/images/social/web.png";
import maps from "../assets/images/social/maps.png";
import phone from "../assets/images/social/phone.png";

export const contactButtonsOptions = [
  {
    name: "Teléfono",
    icon: <FaPhone size={40} />,
    color: "#2E60E7",
    placeholder: "76543218",
    type: "tel",
    img: phone
  },
  {
    name: "E-mail",
    icon: <IoMail size={40} />,
    color: "#E42300",
    placeholder: "usuario@ejemplo.com",
    type: "mail",
    img: email
  },
  {
    name: "WhatsApp",
    icon: <IoLogoWhatsapp size={40} />,
    color: "#25D366",
    placeholder: "76543218",
    type: "tel",
    img: whatsapp
  },
  {
    name: "Sitio Web",
    icon: <GoGlobe size={40} />,
    color: "#4BC6F0",
    placeholder: "https://tupagina.com",
    type: "text",
    img: web
  },
  {
    name: "Google Maps",
    icon: <SiGooglemaps size={40} />,
    color: "#119047",
    placeholder: "https://maps.app.goo.gl/tudireccion",
    type: "text",
    img: maps
  },
];

const ContactButtons = ({
  elementsInfo = { title: "", description: "", contactLinks: [] },
  setElementsInfo,
  licenseType = "",
  setOpenUpdate
}) => {
  const [openContactModal, setOpenContactModal] = useState(false);

  const [indexEditContactLink, setIndexEditContactLink] = useState(-1);

  const deletedContactLinkByIndex = (index) => {
    let contactLinksCopy = [...elementsInfo.contactLinks];
    contactLinksCopy.splice(index, 1);
    setElementsInfo({ ...elementsInfo, contactLinks: contactLinksCopy });
  };

  const editContactLink = (index) => {
    setIndexEditContactLink(index);
    setOpenContactModal(true);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.contactLinks?.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color="secondary" textAlign="center">
            Agrega números de teléfono, direcciones de correo electrónico y
            otros métodos de contacto para que las personas puedan comunicarse
            contigo en diversas situaciones.
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Agregar Contacto' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.contactLinks?.map((icon, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={icon.name}
            >
              <div className="d-flex align-items-center flex-column">
                <IconButton
                  style={{
                    color: contactButtonsOptions.find(
                      (option) => option.name === icon.name
                    ).color,
                  }}
                >
                  {
                    contactButtonsOptions.find(
                      (option) => option.name === icon.name
                    ).icon
                  }
                </IconButton>
                <Typography variant="caption">{icon.name}</Typography>
              </div>

              <Typography
                style={{ flex: 100, wordWrap: "break-word", width: 120 }}
                key={icon.url + index}
                marginLeft={2}
                marginRight={2}
              >
                {icon.url}
              </Typography>
              <IconButton onClick={() => editContactLink(index)}>
                <LiaEditSolid size={30} color="#4C77EA" />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deletedContactLinkByIndex(index)}
              >
                <GoTrash />
              </IconButton>
            </div>
          ))}
        </>
      )}
      <div className="mt-4"></div>
      <div className="d-flex align-items-center justify-content-center">
        <SmallPrimaryButton onClick={() => setOpenContactModal(true)}>
          Agregar Contacto
        </SmallPrimaryButton>
      </div>
      <ContactMethodsDialog
        open={openContactModal}
        onClose={() => {
          setOpenContactModal(false);
          setIndexEditContactLink(-1);
        }}
        setElementsInfo={setElementsInfo}
        elementsInfo={elementsInfo}
        indexEditContactLink={indexEditContactLink}
        isEditing={indexEditContactLink !== -1}
        licenseType={licenseType}
        setOpenUpdate={setOpenUpdate}
      />
    </StyledCard>
  );
};

export default ContactButtons;
