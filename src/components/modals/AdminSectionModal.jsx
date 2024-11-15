import {
  Dialog,
  TextField,
  Typography,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowsSize";
import { GREY_RECTANGLE, LICENSE_TYPES, URL_NAME } from "../../utils/constants";
import ThinTitle from "../texts/ThinTitle";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import Image from "next/image";

const AdminSectionModal = ({ open, elementsInfo, index, setOpen }) => {
  const [userInfoCop, setUserInfoCop] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [card, setCard] = useState({});

  useEffect(() => {
    setError("");
    setCard({});
    setUserInfoCop(elementsInfo);
    if (elementsInfo.adminCards[index]) searchAccount();
  }, [index, elementsInfo, open]);

  const handleEditButton = (val) => {
    setError("");
    const userInfoCopy = { ...userInfoCop };

    userInfoCopy.adminCards[index] = val;
    setUserInfoCop(userInfoCopy);
  };

  const { width } = useWindowSize();

  const onClose = () => {
    if (Object.keys(card).length === 0) {
      const elementsInfoCopy = { ...userInfoCop };
      elementsInfoCopy.adminCards.splice(index, 1);
      setUserInfoCop(elementsInfoCopy);
    }
    setOpen(false);
  };

  const searchAccount = async () => {
    if (
      userInfoCop.adminCards == undefined ||
      userInfoCop.adminCards[index] == undefined
    )
      return false;
    setLoading(true);
    try {
      const q = query(
        collection(db, "cards"),
        where("urlPage", "==", userInfoCop.adminCards[index])
      );
      const querySnapshot = await getDocs(q);

      let cardCop = {};

      if (querySnapshot.empty) {
        setCard({});
        setError("No se encontró la tarjeta");
        return false;
      }

      querySnapshot.forEach((doc) => {
        cardCop = { id: doc.id, ...doc.data() };
      });

      try {
        const docSnap = await getDoc(doc(db, "users", cardCop.userId));
        const user = docSnap.data();
        if (user.licenseType === LICENSE_TYPES.PREMIUM) {
          setError("");
          setCard({ ...cardCop });
          return true;
        } else {
          setCard({});
          setError(
            "El usuario propietario de la tarjeta no cuenta con la licencia Profesional"
          );
          return false;
        }
      } catch (e) {
        setCard({});
        setError(
          "El usuario propietario de la tarjeta no cuenta con la licencia Profesional"
        );
        return false;
      }
    } catch (error) {
      setCard({});
      setError("Hubo un error añadiendo la tarjeta");
      return false;
    } finally {
      setLoading(false);
      return true;
    }
  };

  const searchAndClose = async () => {
    const possible = await searchAccount();
    if (possible) {
      setTimeout(() => {
        setOpen(false);
      }, 1200);
    }
  };

  return (
    <>
      {open && elementsInfo.adminCards.length > 0 && (
        <Dialog open={open} onClose={onClose} style={{ margin: 0 }}>
          <div style={{ padding: width > 768 ? 40 : 16 }}>
            <Typography variant="h5">Cuenta vinculada</Typography>
            <br />
            <div className="d-flex align-items-center justify-content-center">
              <ThinTitle
                variant={width > 768 ? "h6" : "body2"}
                color="primary"
                style={{ marginBottom: 32 }}
              >
                {URL_NAME}
              </ThinTitle>
              <div style={{ width: width > 768 ? 30 : 15 }}></div>
              <TextField
                variant="outlined"
                label="Nombre de la tarjeta:"
                helperText={"Nombre de la tarjeta a vincular"}
                value={userInfoCop.adminCards[index]}
                onChange={(e) => handleEditButton(e.target.value)}
                fullWidth
                required
                inputProps={{
                  maxLength: 25,
                }}
                style={{
                  marginBottom: 6,
                }}
                maxLength={25}
              />
            </div>
            <br />

            <div>
              {loading ? (
                <div className="d-flex align-items-center justify-content-center">
                  <CircularProgress />
                </div>
              ) : Object.keys(card).length > 0 ? (
                <div className="d-flex align-items-center">
                  <Image
                    src={
                      card.profilePhoto ? card.profilePhoto.url : GREY_RECTANGLE
                    }
                    style={{
                      objectFit: "cover",
                      width: 62,
                      height: 62,
                      marginLeft: 16,
                    }}
                    width={800}
                    height={800}
                  />
                  <Typography
                    style={{
                      wordWrap: "break-word",
                      textAlign: "left",
                      maxWidth: 400,
                    }}
                    marginLeft={5}
                    marginRight={20}
                  >
                    {card.title}
                  </Typography>
                </div>
              ) : (
                <></>
              )}
            </div>

            {error.length > 0 && <Typography color="error">{error}</Typography>}
          </div>
          <DialogActions style={{ marginBottom: 16, marginRight: 8 }}>
            <Button
              onClick={searchAndClose}
              variant="contained"
              color="primary"
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AdminSectionModal;
