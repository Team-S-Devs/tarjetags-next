import React from "react";
import StyledCard from "../components/card/StyledCard";
import { FaUser } from "react-icons/fa";
import ThinTitle from "../components/texts/ThinTitle";
import FieldText from "../components/form/fields/FieldText";
import useWindowSize from "../hooks/useWindowsSize";
import ImageUploader from "../components/form/fields/ImageUploader";
import { BsStars } from "react-icons/bs";
import ThemeSelector from "../components/form/ThemeSelector";
import { TextField } from "@mui/material";
import { MAIN_COLOR } from "../utils/constants";

const ElementsCardTab = ({
  elementsInfo = {
    title: "",
    description: "",
    profilePhoto: {
      name: "",
      url: "",
      file: null,
    },
    coverPhoto: {
      name: "",
      url: "",
      file: null,
    },
  },
  setElementsInfo,
}) => {
  const handleChange = (newVal, key) => {
    const copyEl = { ...elementsInfo };
    copyEl[key] = newVal;
    setElementsInfo(copyEl);
  };

  const handleTwoChange = (newVal, key, newKey) => {
    const copyEl = { ...elementsInfo };
    copyEl[key][newKey] = newVal;
    setElementsInfo(copyEl);
  };

  const { width } = useWindowSize();

  return (
    <>
      <div className="mt-4"></div>
      <StyledCard>
        <div
          style={{
            paddingLeft: width > 768 ? 32 : 16,
            paddingRight: width > 768 ? 32 : 16,
            paddingTop: 20,
            paddingBottom: 16,
          }}
        >
          <div className="d-flex align-items-center">
            <FaUser color={MAIN_COLOR} size={20} style={{ marginRight: 8 }} />
            <ThinTitle color="primary" variant="h6">
              Información de usuario
            </ThinTitle>
          </div>
          <div className="mt-3"></div>
          <FieldText
            maxLength={60}
            label="Título"
            value={elementsInfo.title}
            setValue={(newVal) => handleChange(newVal, "title")}
          />
          <FieldText
            multiline
            maxLength={300}
            value={elementsInfo.description}
            label="Sobre el usuario:"
            marginTop={2}
            minRows={3}
            setValue={(newVal) => handleChange(newVal, "description")}
            placeholder="Describa brevemente su funciones o cargo dentro de su empresa."
          />
          <FieldText
            multiline
            maxLength={300}
            value={elementsInfo.companyDescription}
            label="Sobre su empresa:"
            marginTop={2}
            minRows={3}
            setValue={(newVal) => handleChange(newVal, "companyDescription")}
            placeholder="Describa brevemente la información importante acerca de su empresa."
          />
          <ImageUploader
            file={elementsInfo.profilePhoto?.file}
            setFile={(newVal) =>
              handleTwoChange(newVal, "profilePhoto", "file")
            }
            imageUrl={elementsInfo.profilePhoto?.url}
            setImageUrl={(newVal) =>
              handleTwoChange(newVal, "profilePhoto", "url")
            }
            handleErrorMsg={() => {}}
            productData={elementsInfo.profilePhoto}
            label="Foto de perfil o logotipo: "
          />

          <ImageUploader
            file={elementsInfo.coverPhoto?.file}
            setFile={(newVal) => handleTwoChange(newVal, "coverPhoto", "file")}
            imageUrl={elementsInfo.coverPhoto?.url}
            setImageUrl={(newVal) =>
              handleTwoChange(newVal, "coverPhoto", "url")
            }
            handleErrorMsg={() => {}}
            productData={elementsInfo.coverPhoto}
            label="Foto de portada: "
          />
          <br />
          <div className="d-flex align-items-center">
            <BsStars color={MAIN_COLOR} size={24} />
            <div className="ml-2"></div>
            <ThinTitle variant="h6" color="primary" textAlign="center">
              Diseño
            </ThinTitle>
          </div>

          <div className="mt-2"></div>
          <ThinTitle variant="subtitle1" color="primary" textAlign="left">
            Fondo
          </ThinTitle>
          <ThemeSelector
            elementsInfo={elementsInfo}
            setElementsInfo={setElementsInfo}
          />

          <div className="mt-2"></div>
          <ThinTitle variant="subtitle1" color="primary" textAlign="left">
            Color principal
          </ThinTitle>
          <div className="mt-3"></div>
          <TextField
            label={"Seleccionar color"}
            fullWidth
            type="color"
            value={elementsInfo.color}
            onChange={(e) =>
              setElementsInfo({ ...elementsInfo, color: e.target.value })
            }
          />
        </div>
      </StyledCard>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ElementsCardTab;
