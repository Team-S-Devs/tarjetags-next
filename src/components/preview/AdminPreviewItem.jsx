import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Button } from "@mui/material";
import {
  GREY_RECTANGLE,
  LICENSE_TYPES,
  MAIN_COLOR,
} from "../../utils/constants.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link.js";
import Image from "next/image.js";

const AdminPreviewItem = ({ currCard, bgColor = "#fff", dark, mainColor = MAIN_COLOR }) => {
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

  return (
    <>
      <div
        className="d-flex align-items-center mt-2 mb-3"
        style={{ padding: "0 28px", textDecoration: "none" }}
      >
        {error ? (
          <> </>
        ) : loading ? (
          <div className="d-flex justify-content-center w-100">
            <CircularProgress sx={{ color: mainColor }} />
          </div>
        ) : (
          <Card
            style={{
              background: bgColor,
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: 3,
                paddingRight: 3,
              }}
              style={{
                background: bgColor,
              }}
              variant="contained"
              component={Link}
              href={`/${card.urlPage}`}
              target="_blank"
            >
              <Box>
                <Image
                  src={
                    card.profilePhoto ? card.profilePhoto.url : GREY_RECTANGLE
                  }
                  width={80}
                  height={80}
                  style={{
                    objectFit: "cover",
                    width: 80,
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", marginLeft: 2 }}
              >
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    component="p"
                    variant="body1"
                    style={{
                      wordBreak: "break-word",
                      textAlign: "left",
                      color: dark ? "#fff" : "#000",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="p"
                    style={{
                      wordBreak: "break-word",
                      textAlign: "left",
                      color: dark ? "#bbb" : "#555",
                    }}
                  >
                    {card.urlPage}
                  </Typography>
                </CardContent>
              </Box>
            </Button>
          </Card>
        )}
      </div>
    </>
  );
};

export default AdminPreviewItem;
