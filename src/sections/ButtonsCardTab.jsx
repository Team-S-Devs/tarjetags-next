import React from "react";
import ThinTitle from "../components/texts/ThinTitle";
import SocialMediaButtons from "./SocialMediaButtons";
import ContactButtons from "./ContactButtons";
import ExtraButtons from "./ExtraButtons";
import ShareButtonSwitch from "./ShareButtonSwitch";
import AdminSection from "./AdminSection";
import { LICENSE_TYPES, licenseLimits } from "../utils/constants";
import { FaLock } from "react-icons/fa";

const ButtonsCardTab = ({
  elementsInfo = { title: "", description: "", socialLinks: [] },
  setElementsInfo,
  cardId,
  licenseType = "",
  setOpenUpdate,
}) => {
  return (
    <div>
      <br />
      <br />
      <ShareButtonSwitch
        elementsInfo={elementsInfo}
        setElementsInfo={setElementsInfo}
      />
      <br />
      <div className="mt-4">
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Enlaza tus redes sociales
        </ThinTitle>
      </div>
      <div className="mt-3">
        <SocialMediaButtons
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
        />
      </div>
      <br />
      <div className="mt-4" style={{ marginTop: 400 }}>
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Añade formas de contacto
        </ThinTitle>
      </div>
      <div className="mt-3">
        <ContactButtons
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
          licenseType={licenseType}
          setOpenUpdate={setOpenUpdate}
        />
      </div>
      <br />
      <div className="mt-4" style={{ marginTop: 400 }}>
        <ThinTitle variant="h5" color="primary" textAlign="center">
          Agrega botones extra
        </ThinTitle>
      </div>
      <div className="mt-3">
        <ExtraButtons
          elementsInfo={elementsInfo}
          setElementsInfo={setElementsInfo}
          cardId={cardId}
        />
      </div>
      <br />
      <div
        onClick={() => {
          if (!licenseLimits[licenseType].admin) setOpenUpdate(LICENSE_TYPES.PREMIUM);
        }}
      >
        <div className="mt-4" style={{ marginTop: 400 }}>
          <ThinTitle
            variant="h5"
            color={!licenseLimits[licenseType].admin ? "gray" : "primary"}
            textAlign="center"
          >
            Administrador
            {!licenseLimits[licenseType].admin && (
              <FaLock style={{ marginLeft: 20, cursor: "pointer" }} />
            )}
          </ThinTitle>
        </div>
        <div className="mt-3">
          <AdminSection
            elementsInfo={elementsInfo}
            setElementsInfo={setElementsInfo}
            licenseType={licenseType}
            disabled={!licenseLimits[licenseType].admin}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ButtonsCardTab;
