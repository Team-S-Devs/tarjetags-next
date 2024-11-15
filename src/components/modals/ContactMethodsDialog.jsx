import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { contactButtonsOptions } from "../../sections/ContactButtons";
import { FaLock } from "react-icons/fa";
import { LICENSE_TYPES, licenseLimits } from "../../utils/constants";

const ContactMethodsDialog = ({
  open,
  onClose,
  elementsInfo = { title: "", description: "", contactLinks: [] },
  setElementsInfo,
  indexEditContactLink,
  isEditing = false,
  licenseType = "",
  setOpenUpdate,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [profileLink, setProfileLink] = useState("");
  const [error, setError] = useState(false);

  const handleIconClick = (name) => {
    if (licenseLimits[licenseType].excludedButtons.includes(name)) {
      setOpenUpdate(LICENSE_TYPES.STANDARD + " o " + LICENSE_TYPES.PREMIUM);
      return;
    }
    setError("");
    if (selectedIcon === name) {
      setSelectedIcon(null);
    } else {
      setSelectedIcon(name);
    }
  };

  useEffect(() => {
    if (isEditing) {
      setSelectedIcon(elementsInfo.contactLinks[indexEditContactLink].name);
      setProfileLink(elementsInfo.contactLinks[indexEditContactLink].url);
    } else {
      setSelectedIcon(null);
      setProfileLink("");
    }
  }, [isEditing]);

  const handleSave = () => {
    if (selectedIcon && profileLink.trim() !== "") {
      if (!isEditing) {
        setElementsInfo({
          ...elementsInfo,
          contactLinks: [
            ...elementsInfo.contactLinks,
            { name: selectedIcon, url: profileLink.trim() },
          ],
        });
      } else {
        let contactLinksCopy = [...elementsInfo.contactLinks];
        contactLinksCopy[indexEditContactLink] = {
          name: selectedIcon,
          url: profileLink.trim(),
        };
        setElementsInfo({ ...elementsInfo, contactLinks: contactLinksCopy });
      }
      setSelectedIcon(null);
      setProfileLink("");
      onClose();
    } else if (!selectedIcon) {
      setError("Selecciona un ícono.");
    } else {
      setError("Introduce el link de tu perfil de la red social.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selecciona tu método de contacto</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {contactButtonsOptions.map((option) => (
            <Grid
              item
              key={option.name}
              xs={3}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <div className="d-flex">
                <IconButton
                  style={{
                    color:
                      selectedIcon === option.name ? option.color : undefined,
                  }}
                  onClick={() => handleIconClick(option.name)}
                >
                  {option.icon}
                </IconButton>
                {licenseLimits[licenseType].excludedButtons.includes(
                  option.name
                ) && <FaLock color="#888" />}
              </div>
              <Typography variant="caption">{option.name}</Typography>
            </Grid>
          ))}
        </Grid>
        <TextField
          label={
            selectedIcon
              ? contactButtonsOptions.find(
                  (option) => option.name === selectedIcon
                ).type === "tel"
                ? "Introduce tu Nº de " +
                  contactButtonsOptions.find(
                    (option) => option.name === selectedIcon
                  ).name
                : contactButtonsOptions.find(
                    (option) => option.name === selectedIcon
                  ).type === "mail"
                ? "Introduce tu correo electrónico"
                : `Enlace de tu perfil 
            ${
              selectedIcon
                ? " en " +
                  contactButtonsOptions.find(
                    (option) => option.name === selectedIcon
                  ).name
                : ""
            } `
              : "Forma de contacto"
          }
          fullWidth
          type={
            selectedIcon
              ? contactButtonsOptions.find(
                  (option) => option.name === selectedIcon
                ).type
              : "tel"
          }
          value={profileLink}
          onChange={(e) => {
            setError("");
            setProfileLink(e.target.value);
          }}
          placeholder={
            selectedIcon
              ? `Ej. ${
                  contactButtonsOptions.find(
                    (option) => option.name === selectedIcon
                  ).placeholder
                }`
              : "Introduce tu forma de contacto"
          }
          style={{ marginTop: "28px" }}
        />
        {error !== "" && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions style={{ marginBottom: 16, marginRight: 8 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactMethodsDialog;
