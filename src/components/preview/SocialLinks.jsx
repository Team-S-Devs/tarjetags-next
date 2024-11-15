import { Grid, IconButton } from "@mui/material";
import React from "react";
import { socialMediaOptions } from "../../sections/SocialMediaButtons";
import Image from "next/image";

const SocialLinks = ({ elementsInfo = {}, smallPreview }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        marginLeft: smallPreview ? -4 : -16,
      }}
    >
      <Grid
        container
        spacing={smallPreview ? 2 : 3}
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        style={{
          width: "100%",
          maxWidth: "90%",
          margin: smallPreview ? "0px 0" : "16px 0",
        }}
      >
        {elementsInfo.socialLinks?.map((icon, index) => (
          <Grid item key={icon.name}>
            <IconButton
              style={{
                background: "#fff",
                color: socialMediaOptions.find(
                  (option) => option.name === icon.name
                ).color,
                padding: 1,
                borderRadius: "50%",
              }}
              href={icon.url}
            >
              <Image
                width={smallPreview ? 40 : 60}
                style={{ borderRadius: "50%" }}
                src={
                  socialMediaOptions.find((option) => option.name === icon.name)
                    .img
                }
                height={smallPreview ? 40 : 60}
                alt={`${icon.name} - img`}
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SocialLinks;
