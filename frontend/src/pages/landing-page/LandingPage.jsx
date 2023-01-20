import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import NavBar from "./NavBar";

function LandingPage() {
  const [sectionNum, setSectionNum] = useState("init");

  // useEffect(() => {
  //   function handleMouseMove(e) {
  //     const w = (e.clientX / window.innerWidth) * 100;
  //     setWidth(w);
  //   }
  //   document.onmousemove = (e) => handleMouseMove(e);
  // }, []);

  // function switchSection() {
  //   if (sectionNum === 1) {
  //     setSectionNum(2);
  //   } else {
  //     sectionNum(1);
  //   }
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      // switchSection();
      if (sectionNum == "init") {
        setSectionNum(true);
        return;
      }
      setSectionNum((x) => !x);
    }, 3500);
    return () => clearInterval(interval);
  }, [sectionNum]);

  return (
    <div className={styles.landing_page}>
      <NavBar />
      <div
        id="lost_section"
        className={classNames(`${styles.main} ${styles.lost_section}`, {
          [styles.expand_section]: sectionNum === true,
        })}
        // style={{ zIndex: { sectionNum } }}
      >
        <div>
          <div className={styles.main_subtitle}>The app where you can</div>
          <div className={styles.main_title}>find the items that you lost</div>
          <div className={styles.main_buttons_wrapper}>
            <Link to="sign-up">
              <button className={styles.secondary_button}>Sign up</button>
            </Link>
            <Link to="login">
              <button className={styles.primary_button}>Log in</button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={classNames(`${styles.main} ${styles.found_section}`, {
          [styles.expand_section]: sectionNum === false,
        })}
        // style={{ zIndex: 5 }}
      >
        <div>
          <div className={styles.main_subtitle}>The app where you can</div>
          <div className={styles.main_title}>
            share the items that you found
          </div>
          <div className={styles.main_buttons_wrapper}>
            <Link to="sign-up">
              <button className={styles.secondary_button}>Sign up</button>
            </Link>
            <Link to="login">
              <button className={styles.primary_button}>Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
