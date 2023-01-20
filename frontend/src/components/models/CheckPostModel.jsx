import React, { useRef, useState } from "react";
import styles from "../../styles/checkpostmodel.module.css";
import abstract from "../../styles/abstract.module.css";
import CardLayout from "../layouts/CardLayout";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import classNames from "classnames";
import api from "../../services/api";

function CheckPostModel({ post, isOpen, onClose, isSaved, setIsSaved }) {
  const ref = useRef();
  const [animate, setAnimate] = useState(2);

  const input = useRef(null);

  function handleSave(e) {
    e.preventDefault();
    setIsSaved((x) => !x);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  }

  const theRealOnClose = () => {
    if (!ref.current) return;
    ref.current.classList.add(styles["model-close"]);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleClose = (e) => {
    if (!ref.current) return;
    if (!ref.current.contains(e.target)) {
      theRealOnClose();
    }
  };

  async function sendMessage(e) {
    e.preventDefault();
    const user = post.person;
    const msg = input.current.value;
    theRealOnClose();
    const res = await api("zbida@gmail.com", "123").post("send_email", {
      to: user.id,
      body: msg,
    });
    console.log(res);
  }

  return (
    isOpen && (
      <div className={styles.model_page} onClick={handleClose}>
        <CardLayout post={post} onClose={theRealOnClose} ref={ref}>
          <div className={styles.contact_user}>
            <div className={styles.contact_user_ray}></div>
            <div className={styles.contact_user_text}>Contact the owner</div>
            <div className={styles.contact_user_ray}></div>
          </div>
          <form className={styles.model_form}>
            <textarea placeholder="Write your message" ref={input} />
            <div className={styles.model_buttons_wrapper}>
              <button className={styles.save_button} onClick={handleSave}>
                <div className={styles.save_button_text}>
                  {!isSaved ? "Save" : "Saved"}
                </div>
                <div
                  className={classNames(styles.save_button_icon, {
                    [styles.did_click]: animate,
                  })}
                >
                  {!isSaved ? <FavoriteBorder /> : <Favorite />}
                </div>
              </button>
              <button className={abstract.primary_button} onClick={sendMessage}>
                Send message
              </button>
            </div>
          </form>
        </CardLayout>
      </div>
    )
  );
}

export default CheckPostModel;
