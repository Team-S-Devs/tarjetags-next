import React, { useState } from "react";
import StyledCard from "../components/card/StyledCard";
import ThinTitle from "../components/texts/ThinTitle";
import { IconButton, Typography } from "@mui/material";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitch,
  FaSnapchat,
  FaReddit,
  FaDiscord,
  FaSpotify,
  FaBehance,
  FaPinterest,
  FaXing,
  FaFlickr,
  FaVimeo,
  FaTelegram,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import SocialMediaDialog from "../components/modals/SocialMediaDialog";
import facebook from "../assets/images/social/facebook.png";
import instagram from "../assets/images/social/instagram.png";
import x from "../assets/images/social/x.png";
import twitch from "../assets/images/social/twitch.png";
import threads from "../assets/images/social/threads.png";
import youtube from "../assets/images/social/youtube.png";
import discord from "../assets/images/social/discord.png";
import vimeo from "../assets/images/social/vimeo.png";
import linkedin from "../assets/images/social/linkedin.png";
import telegram from "../assets/images/social/telegram.png";
import spotify from "../assets/images/social/spotify.png";
import tiktok from "../assets/images/social/tiktok.png";
import behance from "../assets/images/social/behance.png";
import pinterest from "../assets/images/social/pinterest.png";
import reddit from "../assets/images/social/reddit.png";
import snapchat from "../assets/images/social/snapchat.png";


export const socialMediaOptions = [
  {
    name: "Facebook",
    icon: <FaFacebook size={40} />,
    color: "#1877f2",
    placeholder: "https://www.facebook.com/tuperfil",
    img: facebook
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={40} />,
    color: "#e4405f",
    placeholder: "https://www.instagram.com/tuperfil",
    img: instagram
  },
  {
    name: "Twitter",
    icon: <FaXTwitter size={40} />,
    color: "#000",
    placeholder: "https://twitter.com/tuperfil",
    img: x
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={40} />,
    color: "#0077b5",
    placeholder: "https://www.linkedin.com/in/tuperfil",
    img: linkedin
  },
  {
    name: "YouTube",
    icon: <FaYoutube size={40} />,
    color: "#ff0000",
    placeholder: "https://www.youtube.com/c/tucanal",
    img: youtube
  },
  {
    name: "TikTok",
    icon: <FaTiktok size={40} />,
    color: "#000000",
    placeholder: "https://www.tiktok.com/@tunombredeusuario",
    img: tiktok
  },
  {
    name: "Behance",
    icon: <FaBehance size={40} />,
    color: "#1769ff",
    placeholder: "https://www.behance.net/tuperfil",
    img: behance
  },
  {
    name: "Pinterest",
    icon: <FaPinterest size={40} />,
    color: "#bd081c",
    placeholder: "https://www.pinterest.com/tuperfil",
    img: pinterest
  },
  {
    name: "Reddit",
    icon: <FaReddit size={40} />,
    color: "#ff4500",
    placeholder: "https://www.reddit.com/user/tunombredeusuario",
    img: reddit
  },
  {
    name: "Snapchat",
    icon: <FaSnapchat size={40} />,
    color: "#fffc00",
    placeholder: "https://www.snapchat.com/add/tunombredeusuario",
    img: snapchat
  },
  {
    name: "Telegram",
    icon: <FaTelegram size={40} />,
    color: "#0088cc",
    placeholder: "https://t.me/tunombredeusuario",
    img: telegram
  },
  {
    name: "Twitch",
    icon: <FaTwitch size={40} />,
    color: "#6441a5",
    placeholder: "https://www.twitch.tv/tucanal",
    img: twitch
  },
  {
    name: "Discord",
    icon: <FaDiscord size={40} />,
    color: "#5865f2",
    placeholder: "https://discord.gg/yourserver",
    img: discord
  },
  {
    name: "Spotify",
    icon: <FaSpotify size={40} />,
    color: "#1db954",
    placeholder: "https://open.spotify.com/user/tunombredeusuario",
    img: spotify
  },
  {
    name: "Threads",
    icon: <FaThreads size={40} />,
    color: "#000",
    placeholder: "https://threads.net/@tunombredeusuario",
    img: threads
  },
  {
    name: "Vimeo",
    icon: <FaVimeo size={40} />,
    color: "#1ab7ea",
    placeholder: "https://vimeo.com/tunombredeusuario",
    img: vimeo
  },
];

const SocialMediaButtons = ({
  elementsInfo = { title: "", description: "", socialLinks: [] },
  setElementsInfo,
}) => {
  const [openSocialModal, setOpenSocialModal] = useState(false);

  const [indexEditSocialLink, setIndexEditSocialLink] = useState(-1);

  const deletedSocialLinkByIndex = (index) => {
    let socialLinksCopy = [...elementsInfo.socialLinks];
    socialLinksCopy.splice(index, 1);
    setElementsInfo({ ...elementsInfo, socialLinks: socialLinksCopy });
  };

  const editSocialLink = (index) => {
    setIndexEditSocialLink(index);
    setOpenSocialModal(true);
  };

  return (
    <StyledCard style={{ padding: 30 }}>
      {elementsInfo.socialLinks?.length === 0 ? (
        <>
          <ThinTitle variant="subtitle1" color="secondary" textAlign="center">
            Conecta tus perfiles de redes sociales a tu tarjeta de presentación
            digital para que las personas puedan encontrarte fácilmente en
            línea.
          </ThinTitle>
          <div className="mt-4"></div>
          <ThinTitle variant="subtitle1" color="gray" textAlign="center">
            Haz clic en 'Agregar Red Social' para empezar
          </ThinTitle>
        </>
      ) : (
        <>
          {elementsInfo.socialLinks?.map((icon, index) => (
            <div
              className="d-flex align-items-center mt-2 mb-3"
              key={icon.name}
            >
              <div className="d-flex align-items-center flex-column">
                <IconButton
                  style={{
                    color: socialMediaOptions.find(
                      (option) => option.name === icon.name
                    ).color,
                  }}
                >
                  {
                    socialMediaOptions.find(
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
              <IconButton onClick={() => editSocialLink(index)}>
                <LiaEditSolid size={30} color="#4C77EA" />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deletedSocialLinkByIndex(index)}
              >
                <GoTrash />
              </IconButton>
            </div>
          ))}
        </>
      )}
      <div className="mt-4"></div>
      <div className="d-flex align-items-center justify-content-center">
        <SmallPrimaryButton onClick={() => setOpenSocialModal(true)}>
          Agregar Red Social
        </SmallPrimaryButton>
      </div>
      <SocialMediaDialog
        open={openSocialModal}
        onClose={() => {
          setOpenSocialModal(false);
          setIndexEditSocialLink(-1);
        }}
        setElementsInfo={setElementsInfo}
        elementsInfo={elementsInfo}
        indexEditSocialLink={indexEditSocialLink}
        isEditing={indexEditSocialLink !== -1}
      />
    </StyledCard>
  );
};

export default SocialMediaButtons;
