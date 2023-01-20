import React, { forwardRef, useEffect, useRef } from "react";
import styles from "../../styles/cardlayout.module.css";
import UserTag from "../UserTag";
import usertag from "../../styles/usertag.module.css";
import { Close } from "@mui/icons-material";
import { baseURL } from "../../services/api";

const CardLayout = forwardRef(({ post, onClose, children }, ref) => {
  const user = post.person;

  function close() {
    onClose();
  }

  return (
    <div className={styles.model} ref={ref}>
      <div className={styles.post_head}>
        <div className={styles.post_header}>
          {post.type === "lost" ? (
            <span className={styles.post_type_lost}>LOST ITEM : </span>
          ) : (
            <span className={styles.post_type_found}>FOUND ITEM : </span>
          )}
          <span className={styles.post_title}>{post.title}</span>
        </div>
        <button onClick={close}>
          <Close />
        </button>
      </div>
      <div className={styles.main_wrapper}>
        <div className={styles.user_tags_wrapper}>
          <div className={`${styles.user_tag} ${usertag.small_container}`}>
            <UserTag firstname={user.firstName} lastname={user.lastName} />
          </div>
          <div className={styles.tags_wrapper}>
            <div>
              <span>Category : </span>
              {post.category}
            </div>
            <div>
              <span>City : </span>
              {post.city}
            </div>
            <div>
              <span>Neighborhood : </span>
              {post.neighborhood}
            </div>
            <div>
              <span>Date : </span>
              {post.date}
            </div>
          </div>
        </div>
        <div className={styles.photo_description_wrapper}>
          <div className={styles.photo_wrapper}>
            <img src={`${baseURL}download/${post.imageName}`} alt="photo" />
          </div>
          <div className={styles.description_wrapper}>
            <div className={styles.description_label}>Description :</div>
            <div>{post.description}</div>
          </div>
        </div>
        <div className={styles.bottom_wrapper}>{children}</div>
      </div>
    </div>
  );
});

export default CardLayout;
