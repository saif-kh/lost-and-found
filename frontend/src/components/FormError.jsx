import React from "react";
import { Close } from "@mui/icons-material";
import styles from "../styles/formerror.module.css";

function FormError() {
  return (
    <div className={styles.error_wrapper}>
      <div className={styles.error_icon}>
        <Close />
      </div>
      <div className={styles.error_message}>No field should be left empty</div>
    </div>
  );
}

export default FormError;
