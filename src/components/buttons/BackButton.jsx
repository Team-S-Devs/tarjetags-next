import React from "react";
import IconButton from "@mui/material/IconButton";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const BackButton = ({ color = "black", disabled, size = 44 }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ marginLeft: -8 }}>
      <IconButton
        sx={{
          padding: 0,
        }}
        aria-label="back"
        disabled={disabled}
        onClick={handleBack}
      >
        <FaChevronLeft color={color} size={size} />
      </IconButton>
    </div>
  );
};

export default BackButton;
