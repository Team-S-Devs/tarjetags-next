import React from "react";
import { licenseLimits } from "../../utils/constants";
import AdminPreviewItem from "./AdminPreviewItem";
import ThinTitle from "../texts/ThinTitle";

const AdminPreview = ({ elementsInfo = {}, licenseType, smallPreview }) => {
  return (
    <div>
      {licenseLimits[licenseType]?.admin &&
        elementsInfo.adminCards.length > 0 && (
          <ThinTitle
            style={{
              textOverflow: "ellipsis",
              lineHeight: smallPreview ? "36px" : "64px",
              fontSize: smallPreview ? "1.3em" : "1.8em",
              padding: "0 28px",
              wordBreak: "break-all",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 16,
              color: elementsInfo.theme === "dark" ? "#eee" : "#111",
            }}
          >
            Cuentas relacionadas
          </ThinTitle>
        )}

      {licenseLimits[licenseType]?.admin &&
        elementsInfo.adminCards.map((card, index) => (
          <AdminPreviewItem
            key={card + index}
            currCard={card}
            bgColor={elementsInfo.theme === "dark" ? "#111" : "#FFF"}
            dark={elementsInfo.theme === "dark"}
            mainColor={elementsInfo.color}
          />
        ))}
    </div>
  );
};

export default AdminPreview;
