import { Dialog, Typography, DialogActions, Button } from "@mui/material";
import React from "react";
import useWindowSize from "../../hooks/useWindowsSize";
import { FaStar } from "react-icons/fa";
import { getStringDateFromTimestamp } from "../../utils/methods";
import { Timestamp, limit } from "firebase/firestore";
import { LICENSE_TYPES } from "../../utils/constants";
import { useRouter } from "next/router";

const NearUpgrade = ({ open, setOpen, licenseType, limitDate }) => {
  const { width } = useWindowSize();
  const router = useRouter();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} style={{ margin: 0 }}>
      <div
        style={{
          padding: width > 768 ? 24 : 16,
          marginLeft: 14,
          marginTop: 12,
        }}
      >
        <Typography variant="h5" color={"primary"}>
          {licenseType === LICENSE_TYPES.FREE && limitDate < new Date()
            ? "Licencia expirada"
            : "Licencia a punto de expirar"}
        </Typography>
      </div>
      {licenseType === LICENSE_TYPES.FREE && limitDate < new Date() ? (
        <Typography
          style={{
            wordWrap: "break-word",
            textAlign: "left",
          }}
          marginLeft={5}
          marginRight={2}
          marginBottom={2}
        >
          El periodo de uso de la Licencia Gratis finalizó. Adquiera una
          licencia para editar y publicar su tarjeta.
        </Typography>
      ) : licenseType === LICENSE_TYPES.FREE ? (
        <>
          <Typography
            style={{
              wordWrap: "break-word",
              textAlign: "left",
            }}
            marginLeft={5}
            marginRight={2}
            marginBottom={2}
          >
            Adquiera una licencia antes de que el periodo de uso de la Licencia
            Gratis finalice.
          </Typography>
          <Typography
            style={{
              wordWrap: "break-word",
              textAlign: "left",
            }}
            marginLeft={5}
            marginRight={2}
            marginBottom={2}
          >
            A partir del{" "}
            {getStringDateFromTimestamp(Timestamp.fromDate(limitDate))}, no
            podrá editar ni publicar su tarjeta.
          </Typography>
        </>
      ) : (
        <>
          <Typography
            style={{
              wordWrap: "break-word",
              textAlign: "left",
            }}
            marginLeft={5}
            marginRight={2}
            marginBottom={2}
          >
            Su Licencia {licenseType} expirará el{" "}
            {getStringDateFromTimestamp(Timestamp.fromDate(limitDate))}.
          </Typography>
          <Typography
            style={{
              wordWrap: "break-word",
              textAlign: "left",
            }}
            marginLeft={5}
            marginRight={2}
            marginBottom={2}
          >
            Renuévela o adquiera una nueva licencia para seguir disfrutando de
            todos los beneficios.
          </Typography>
        </>
      )}
      <DialogActions style={{ marginBottom: 16, marginRight: 20 }}>
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          color="primary"
        >
          Cerrar
        </Button>
        <Button
          onClick={() => {
            router.push("/plans");
          }}
          startIcon={<FaStar />}
          variant="contained"
          color="primary"
        >
          Adquirir Licencia
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NearUpgrade;
