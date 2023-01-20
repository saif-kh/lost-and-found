import React, { useContext, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import FormError from "../../components/FormError";
import GoBack from "../../components/GoBack";
import { login } from "../../context/actions/auth";
import { UserContext } from "../../context/store/auth";
import withPrivate from "../../navigation/withPrivate";
import { getPost } from "../../requests/requests";
import abstract from "../../styles/abstract.module.css";
import styles from "../../styles/connexion.module.css";

function Login() {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    // console.log(email, password);
    if (email === "" || password === "") {
      setIsError(true);
      return;
    }
    //   setIsSubmitting(true);
    setIsError(false);
    try {
      // await login(email, password)(dispatch);
      // const user = await getUser()(dispatch);
      // console.log(user);
      console.log("dispatch", dispatch);
      const res = await login(email, password)(dispatch);
      navigate("/user");
      console.log(res);
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.generic_capsule} ${styles.login_capsule}`}>
        <div className={styles.capsule_header}>
          <div>
            <GoBack path="/" name="Home" />
          </div>
          <div className={styles.capsule_header_title}>Login</div>
        </div>
        <div className={abstract.error_container}>
          {isError && <FormError />}
        </div>
        <form>
          <div className={abstract.input_wrapper}>
            <label>Email :</label>
            <input
              type="text"
              placeholder="Insert your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={abstract.input_wrapper}>
            <label>Password :</label>
            <input
              type="password"
              placeholder="Insert your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.capsule_button} onClick={onSubmit}>
            Login
          </button>
          <div className={styles.capsule_under_button}>
            Don’t have an account yet? <Link to={"/sign-up"}>sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
