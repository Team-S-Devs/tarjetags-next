import React from "react";
import StyledCard from "./StyledCard";
import ThinTitle from "../texts/ThinTitle";
import AccentButton from "../buttons/AccentButton";
import lightPurpleSvg from "../../assets/images/light-purple.svg";
import "../../assets/styles/userCard.css";
import { Grid } from "@mui/material";
import FullSmallPrimaryButton from "../buttons/FullSmallPrimaryButton";
import { useRouter } from "next/router";
import Image from "next/image";

const UserCardDisplay = ({ userCards = [] }) => {
  const router = useRouter();
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="mt-3"></div>
      <Grid container spacing={3} justifyContent="center">
        {userCards.map((userCard, index) => (
          <Grid item key={index}>
            <StyledCard>
              <div className="d-flex flex-column align-items-center">
                <Image
                  src={
                    userCard.coverPhoto?.url && userCard.coverPhoto?.url !== ""
                      ? userCard.coverPhoto.url
                      : lightPurpleSvg
                  }
                  width={800}
                  height={800}
                  alt={`${userCard.title}`}
                  className="portrait-card-img"
                />
                <Image
                  src={
                    userCard.profilePhoto?.url &&
                    userCard.profilePhoto?.url !== ""
                      ? userCard.profilePhoto.url
                      : lightPurpleSvg
                  }
                  width={800}
                  height={800}
                  alt={`${userCard.title}`}
                  className="profile-card-img"
                />
                <ThinTitle variant="h4">
                  {userCard.title === "" ? "Tarjeta" : userCard.title}
                </ThinTitle>
                <div className="mt-3"></div>
                <AccentButton
                  href={`/${userCard.urlPage}`}
                >{`https://tarjetag.com/${userCard.urlPage}`}</AccentButton>
                <div className="mt-4"></div>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={4}>
                    <FullSmallPrimaryButton
                      onClick={() => router.push(`/edit/${userCard.id}`)}
                    >
                      Editar
                    </FullSmallPrimaryButton>
                  </Grid>
                  <Grid item xs={4}>
                    <FullSmallPrimaryButton
                      onClick={() => router.push(`/${userCard.id}`)}
                    >
                      Visitar
                    </FullSmallPrimaryButton>
                  </Grid>
                  <Grid item xs={4}>
                    <FullSmallPrimaryButton
                      onClick={() => router.push(`/details/${userCard.id}`)}
                    >
                      Detalles
                    </FullSmallPrimaryButton>
                  </Grid>
                </Grid>
              </div>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserCardDisplay;
