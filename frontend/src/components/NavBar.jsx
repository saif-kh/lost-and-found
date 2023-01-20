import { Logout, Person } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../context/actions/auth";
import { UserContext } from "../context/store/auth";
import styles from "../styles/layout.module.css";
import usertag from "../styles/usertag.module.css";
import Logo from "./Logo";
import UserTag from "./UserTag";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef(null);
  const buttonref = React.useRef(null);
  const { userState, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  // const {userState} = useContext(UserContext)
  // const user = {
  //   firstname: "john",
  //   lastname: "doe",
  //   email: "johndoe@gmail.com",
  // };

  function handleLogout() {
    logout()(dispatch);
    navigate("/");
  }

  const { user } = userState;
  // console.log("json is :", JSON.parse(localStorage.getItem("user")));
  // const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    onclick = (e) => {
      if (buttonref.current?.contains(e.target)) {
        setIsOpen((x) => !x);
        return;
      }
      if (!ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
  }, [ref.current]);

  function close() {
    setIsOpen(false);
  }

  return (
    <div className={styles.nav_bar}>
      <Logo />
      <div className={styles.nav_bar_left_wrapper}>
        <button
          ref={buttonref}
          className={`${styles.nav_bar_user_button} ${usertag.basic_container}`}
          //   onClick={handleDropDown}
        >
          <UserTag firstname={user.firstName} lastname={user.lastName} />
        </button>
        {isOpen && (
          <div className={styles.nav_bar_dropdown} ref={ref}>
            <div>
              <div className={usertag.column_container}>
                <UserTag firstname={user.firstName} lastname={user.lastName} />
              </div>
              <div className={styles.nav_bar_email}>{user.email}</div>
            </div>
            <Link to={`/user/update`}>
              <button onClick={close}>
                <Person />
                <div>Update personal info</div>
              </button>
            </Link>
            <button onClick={handleLogout}>
              <Logout />
              <div>Log out</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
