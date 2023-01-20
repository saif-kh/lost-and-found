import React from "react";
import styles from "../styles/usertag.module.css";

function UserTag({ firstname, lastname }) {
  const short = firstname.charAt(0) + lastname.charAt(0);
  return (
    <div>
      <div className={styles.user_tag_fullname}>
        {`${firstname} ${lastname}`}
      </div>
      <div className={styles.user_tag_shortname}>{short.toUpperCase()}</div>
    </div>
  );
}

export default UserTag;
