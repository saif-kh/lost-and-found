import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../../components/FormError";
import GoBack from "../../components/GoBack";
import { signUp } from "../../requests/requests";
import api from "../../services/api";
import abstract from "../../styles/abstract.module.css";
import styles from "../../styles/connexion.module.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    // console.log(email, password);
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      setIsError(true);
      return;
    }
    //   setIsSubmitting(true);
    setIsError(false);

    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const res = await signUp(user);
      // const x = await getUser()(dispatch);
      navigate("/login");
      console.log(res);
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.generic_capsule} ${styles.signup_capsule}`}>
        <div className={styles.capsule_header}>
          <div>
            <GoBack path="/" name="Home" />
          </div>
          <div className={styles.capsule_header_title}>Sign up</div>
        </div>
        <div className={abstract.error_container}>
          {isError && <FormError />}
        </div>
        <form>
          <div className={styles.two_input_wrapper}>
            <div className={abstract.input_wrapper}>
              <label>First name :</label>
              <input
                type="text"
                placeholder="Insert your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={abstract.input_wrapper}>
              <label>Last name :</label>
              <input
                type="text"
                placeholder="Insert your last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
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
            Sign up
          </button>
          <div className={styles.capsule_under_button}>
            Already have an account? <Link to={"/login"}>login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
