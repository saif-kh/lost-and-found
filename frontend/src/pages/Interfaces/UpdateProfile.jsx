import { ManageAccounts } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { updateUser } from "../../context/actions/auth";
import { UserContext } from "../../context/store/auth";
import api from "../../services/api";
import abstract from "../../styles/abstract.module.css";
import styles from "../../styles/updateprofile.module.css";

function UpdateProfile() {
  const { userState, dispatch } = useContext(UserContext);
  const { user } = userState;
  const [myUser, setMyUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setMyUser((e) => ({ ...e, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const res = await updateUser(myUser)(dispatch);
    navigate("/user");
    console.log(res);
  }

  return (
    <div className={abstract.basic_form_container}>
      <div className={styles.form_header}>
        <ManageAccounts fontSize="large" />
        <div>Update your profile</div>
      </div>
      <form className={abstract.basic_form}>
        <div className={abstract.inputs_container}>
          <div className={abstract.input_wrapper}>
            <label>Firstname :</label>
            <input
              name="firstName"
              value={myUser.firstName}
              type="text"
              placeholder="Insert your new first name"
              onChange={handleChange}
            />
          </div>
          <div className={abstract.input_wrapper}>
            <label>Lastname :</label>
            <input
              name="lastName"
              value={myUser.lastName}
              type="text"
              placeholder="Insert your new last name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={abstract.input_wrapper}>
          <label>Email :</label>
          <input
            name="email"
            value={myUser.email}
            type="text"
            placeholder="Insert your new email"
            onChange={handleChange}
          />
        </div>
        <div className={abstract.input_wrapper}>
          <label>Password :</label>
          <input
            name="password"
            value={myUser.password}
            type="password"
            placeholder="Insert your new password"
            onChange={handleChange}
          />
        </div>
        <button className={abstract.primary_button} onClick={onSubmit}>
          Submit change
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
