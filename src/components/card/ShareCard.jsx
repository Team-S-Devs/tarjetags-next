import React, { useState } from "react";
import StyledCard from "./StyledCard";
import { Grid } from "@mui/material";
import QRCode from "qrcode.react";
import ThinTitle from "../texts/ThinTitle";
import AccentButton from "../buttons/AccentButton";
import SmallPrimaryButton from "../buttons/SmallPrimaryButton";
import { IoDownloadOutline } from "react-icons/io5";
import { GoShareAndroid } from "react-icons/go";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

const ShareCard = ({ urlWithId = "", cardId = "" }) => {
  const [urlCopied, setUrlCopied] = useState(false);

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${cardId}-QR.png`;
    link.click();
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard
        .writeText(urlWithId)
        .then(() => {
          setUrlCopied(true);
          setTimeout(() => {
            setUrlCopied(false);
          }, 8000);
        })
        .catch((error) => {
          alert("No se pudo copiar la URL, intenta de nuevo.");
        });
    } catch (e) {
      alert("Lo sentimos, no se puede copiar desde este navegador.");
    }
  };

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
    <StyledCard>
      <Grid container spacing={8} display={"flex"} alignItems={"center"}>
        <Grid item xs={12} md={5} display={"flex"} justifyContent={"center"}>
          <QRCode value={urlWithId} size={256} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <ThinTitle color="primary" variant="h5" textAlign="center">
                Dirección URL:
              </ThinTitle>
            </Grid>
            <Grid item xs={12}>
              <div>
                <AccentButton href={`/${cardId}`} fullWidth>
                  {`https://tarjetag.com/${cardId}`}
                </AccentButton>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={navigator.share ? 4 : 6}>
                  <SmallPrimaryButton
                    variant="outlined"
                    fullWidth
                    onClick={downloadQRCode}
                    endIcon={<IoDownloadOutline size={18} />}
                  >
                    Descargar QR
                  </SmallPrimaryButton>
                </Grid>
                <Grid item xs={12} md={navigator.share ? 4 : 6}>
                  <SmallPrimaryButton
                    variant="outlined"
                    fullWidth
                    onClick={copyToClipboard}
                    endIcon={
                      urlCopied ? (
                        <LuCopyCheck size={18} />
                      ) : (
                        <LuCopy size={18} />
                      )
                    }
                  >
                    {urlCopied ? "Link Copiado" : "Copiar Link"}
                  </SmallPrimaryButton>
                </Grid>
                {navigator.share && (
                  <Grid item xs={12} md={4}>
                    <SmallPrimaryButton
                      variant="outlined"
                      fullWidth
                      onClick={shareURL}
                      endIcon={<GoShareAndroid size={18} />}
                    >
                      Compartir
                    </SmallPrimaryButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default ShareCard;
