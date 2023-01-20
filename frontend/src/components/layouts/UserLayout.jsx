import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AddCircle,
  Favorite,
  FormatListBulletedRounded,
  SwitchAccount,
} from "@mui/icons-material";
import styles from "../../styles/layout.module.css";
import classNames from "classnames";
import NavBar from "../NavBar";

const NAV_OPTIONS = [
  {
    path: "/user",
    icon: <FormatListBulletedRounded />,
    name: "All posts",
  },
  {
    path: "/user/my-posts",
    icon: <SwitchAccount />,
    name: "My posts",
  },
  {
    path: "/user/saved-posts",
    icon: <Favorite />,
    name: "Saved posts",
  },
];

function UserLayout() {
  let { pathname } = useLocation();
  return (
    <div>
      <NavBar />
      <div className={styles.main_wrapper}>
        <div className={styles.side_nav}>
          {NAV_OPTIONS.map((option, index) => {
            return (
              <Link to={option.path} key={index}>
                <div
                  className={classNames(styles.side_nav_option_wrapper, {
                    [styles.side_nav_option_selected]: pathname === option.path,
                    [styles.side_nav_option_on_hover]: pathname !== option.path,
                  })}
                >
                  <div className={styles.side_nav_option_icon}>
                    {option.icon}
                  </div>
                  <div className={styles.side_nav_option_name}>
                    {option.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.main_section}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
