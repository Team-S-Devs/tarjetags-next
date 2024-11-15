import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const LinkComponent = ({ children, size = 22, to, color = "primary" }) => {
  return (
    <Link
      style={{
        textDecorationColor: "var(--prim-purple)",
      }}
      href={to}
    >
      <Typography
        className="general-link"
        style={{ fontSize: size }}
        color={color}
      >
        {children}
      </Typography>
    </Link>
  );
};

export default LinkComponent;
