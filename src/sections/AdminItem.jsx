import React, { useEffect, useState } from "react";
import { IconButton, Typography, CircularProgress } from "@mui/material";
import { LiaEditSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import { GREY_RECTANGLE, LICENSE_TYPES } from "../utils/constants";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase-config";
import useWindowSize from "../hooks/useWindowsSize";
import Image from "next/image";

const AdminItem = ({
  currCard,
  index,
  elementsInfo,
  setElementsInfo,
  setButtonIdx,
  setOpen,
  disabled,
}) => {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    searchAccount();
  }, [currCard]);

  const searchAccount = async () => {
    if (currCard.length === 0) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "cards"),
        where("urlPage", "==", currCard)
      );
      const querySnapshot = await getDocs(q);

      let cardCop = {};

      if (querySnapshot.empty) {
        setCard({});
        setError(true);
        return;
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
        } else {
          setCard({});
          setError(true);
        }
      } catch (e) {
        setCard({});
        setError(true);
      }
    } catch (error) {
      setCard({});
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const { width } = useWindowSize();

  const deleteCard = (index) => {
    const elementsInfoCopy = { ...elementsInfo };
    elementsInfoCopy.adminCards.splice(index, 1);
    setElementsInfo(elementsInfoCopy);
  };

  return (
    <div className="d-flex align-items-center mt-2 mb-3">
      {error ? (
        <> </>
      ) : loading ? (
        <div className="d-flex justify-content-center w-100">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Image
            src={card.profilePhoto ? card.profilePhoto.url : GREY_RECTANGLE}
            width={62}
            height={62}
            style={{
              objectFit: "cover",
              flex: 20,
              maxWidth: 62,
            }}
            alt={"admin-image"}
          />

          <div style={{ flex: 100, textAlign: "left" }}>
            <Typography
              style={{
                wordWrap: "break-word",
                textAlign: "left",
              }}
              marginLeft={5}
              marginRight={2}
              maxWidth={width > 900 ? 400 : 120}
            >
              {card.title}
            </Typography>
            <Typography
              style={{
                wordWrap: "break-word",
                textAlign: "left",
              }}
              marginLeft={5}
              marginRight={2}
              variant="caption"
              maxWidth={width > 900 ? 200 : 120}
            >
              {card.urlPage}
            </Typography>
          </div>
        </>
      )}
      <IconButton
        onClick={() => {
          setOpen(true);
          setButtonIdx(index);
        }}
        disabled={disabled}
      >
        <LiaEditSolid size={30} color={disabled ? "#BBB" : "#4C77EA"} />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => deleteCard(index)}
        disabled={disabled}
      >
        <GoTrash />
      </IconButton>
    </div>
  );
};

export default AdminItem;
