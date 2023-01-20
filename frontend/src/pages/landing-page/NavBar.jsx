import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import { NAV_OPTIONS } from "./NavOptions";
import styles from "./landingPage.module.css";
import abstract from "../../styles/abstract.module.css";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <Logo isWhite={true} />
      {/* <div className={styles.navBar_options_wrapper}>
        {NAV_OPTIONS.map((option, i) => {
          return <Link key={i}>{option.name}</Link>;
        })}
      </div> */}
      <div className={styles.navBar_buttons_wrapper}>
        <Link to={"/sign-up"}>
          <button className={abstract.secondary_button}>Sign up</button>
        </Link>
        <Link to={"/login"}>
          <button className={abstract.primary_button}>Log in</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
