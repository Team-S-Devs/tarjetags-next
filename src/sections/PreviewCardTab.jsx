import React from "react";
import MediumPrimaryButton from "../components/buttons/MediumPrimaryButton";
import useWindowSize from "../hooks/useWindowsSize";
import Preview from "./Preview";

const PreviewCardTab = ({ handleSave, loading, elementsInfo, licenseType }) => {
  const { width } = useWindowSize();
  return (
    <div
      style={{
        flex: 2,
  
      }}
    >
      {width > 986 && (
        <div className="d-flex" style={{ position: "fixed", marginLeft: 120 }}>
          <div style={{ flex: 10 }}></div>
          <MediumPrimaryButton
            loading={loading}
            onClick={handleSave}
            fontSize={21}
          >
            Publicar Cambios
          </MediumPrimaryButton>
          <div style={{ flex: 10 }}></div>
        </div>
      )}

      <div className="mt-4"></div>
      <div
        style={{
          marginTop: width > 986 ? 50 : 32,
          width: width > 986 ? 360 : 300,
          height: 680,
          marginLeft: width > 986 ? 85 : "10%",
          padding: 6,
          position: width > 986 ? "fixed" : "relative",
          overflow: "hidden",
          borderRadius: 32,
          backgroundColor: "#CCC",
        }}
      >
        <Preview
          elementsInfo={elementsInfo}
          borderRadius={12}
          licenseType={licenseType}
          editPreview
        />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PreviewCardTab;
