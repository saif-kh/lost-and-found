import React from "react";
import abstract from "../styles/abstract.module.css";

function Logo({ isWhite = false }) {
  const white_text = isWhite ? abstract["white_text"] : "";
  return (
    <div className={`${abstract.logo_text} ${white_text}`}>Lost&Found</div>
  );
}

export default Logo;
