import { ExpandMore } from "@mui/icons-material";
import classNames from "classnames";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import styles from "../styles/select.module.css";

function Select({
  values,
  label,
  disabled = false,
  setTrueValue,
  selectName,
  setCityid,
  post,
}) {
  const [open, setOpen] = useState(false);

  // const ref = useRef();

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen((c) => !c);
  };

  const handleChange = (value) => {
    setTrueValue((e) => ({ ...e, [selectName]: value.title }));
    if (selectName === "city") {
      setCityid(value.id);
    }
    setOpen(false);
  };

  // useEffect(() => {
  //   if (ref.current) {
  //     onclick = (e) => {
  //       // e.preventDefault();
  //       if (!ref.current?.contains(e.target)) {
  //         setOpen(false);
  //       }
  //     };
  //   }
  // }, [ref.current]);

  return (
    <div className={styles.select_container}>
      <button
        onClick={handleOpen}
        disabled={disabled}
        className={classNames(styles.select_button, {
          [styles.drop_is_open]: open,
          [styles.select_button_disabled]: disabled,
        })}
      >
        {post[selectName] !== "" ? post[selectName] : label}
        <div className={open ? styles.arrow_up : ""}>
          <ExpandMore />
        </div>
      </button>
      {open && (
        <div className={styles.select_dropdown}>
          {values.map((value, index) => {
            return (
              <div key={index} onClick={() => handleChange(value)}>
                {value.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Select;
