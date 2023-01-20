import { Close } from "@mui/icons-material";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/postform.module.css";
import abstract from "../../styles/abstract.module.css";
import Select from "../Select";
import DragAndDrop from "../DragAndDrop";
import {
  createPost,
  getCategories,
  getCities,
  getNeighborhoods,
  updatePost,
} from "../../requests/postRequests";
import { UserContext } from "../../context/store/auth";
import { useNavigate } from "react-router-dom";

function TypePicker({ setType, type }) {
  return (
    <div className={styles.type_picker}>
      <div className={styles.subtitle}>Choose the type of your post</div>
      <div className={styles.type_choice}>
        <button
          onClick={() => setType("lost")}
          className={type === "lost" ? styles.type_lost : ""}
        >
          LOST
        </button>
        <div></div>
        <button
          onClick={() => setType("found")}
          className={type === "found" ? styles.type_found : ""}
        >
          FOUND
        </button>
      </div>
    </div>
  );
}

function PostFormModel({ isUpdate = false, post, setPost, isOpen, onClose }) {
  const [type, setType] = useState("lost");
  const [cityId, setCityId] = useState(null);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  function handleChange(e) {
    const { name, value } = e.target;
    setPost((e) => ({ ...e, [name]: value }));
    // console.log(name);
  }

  const { userState } = useContext(UserContext);
  const { user } = userState;
  const email = user?.email;
  const password = user?.password;

  async function fetchCities(email, password) {
    try {
      const cities = await getCities(email, password);
      setCities(cities);
      // console.log(cities);
      // return cities;
    } catch (error) {
      throw error;
    }
  }

  async function fetchNeighborhoods(email, password, id) {
    try {
      const neighborhoods = await getNeighborhoods(email, password, id);
      setNeighborhoods(neighborhoods);
      // console.log(neighborhoods);
      // return neighborhoods;
    } catch (error) {
      throw error;
    }
  }

  async function fetchCategories(email, password) {
    try {
      const categories = await getCategories(email, password);
      setCategories(categories);
    } catch (error) {}
  }

  // useEffect(() => console.log(photo), [photo]);

  useEffect(() => {
    fetchCities(email, password);
    fetchCategories(email, password);
  }, [isOpen]);

  useEffect(() => {
    fetchNeighborhoods(email, password, cityId);
  }, [cityId]);

  // const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    console.log(post);
    console.log(photo);
    if (!isUpdate) {
      const res = await createPost(email, password, type, post, photo);
    } else {
      const res = await updatePost(email, password, type, post, photo);
    }
    theRealOnClose();
    // console.log(res);
    // navigate("/user/my-posts");
  }

  const ref = useRef(null);

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

  function handlePhoto(value) {
    setPhoto(value);
  }

  return (
    isOpen && (
      <div className={styles.model_page} onClick={handleClose}>
        <div className={styles.form_container} ref={ref}>
          <div className={styles.model_header}>
            <div>{isUpdate ? "Update post info" : "Create post"}</div>
            <button onClick={theRealOnClose}>
              <Close />
            </button>
          </div>
          {!isUpdate && <TypePicker setType={setType} type={type} />}
          <form className={abstract.basic_form}>
            <div className={abstract.inputs_container}>
              <div className={abstract.input_wrapper}>
                <label>Title :</label>
                <input
                  type="text"
                  placeholder="Insert the post title"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                />
              </div>
              <div className={abstract.input_wrapper}>
                <label>Date :</label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  name="date"
                  value={post.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={abstract.inputs_container}>
              <div className={abstract.input_wrapper}>
                <label>City :</label>
                <Select
                  values={cities}
                  label="Choose a city"
                  setTrueValue={setPost}
                  selectName="city"
                  setCityid={setCityId}
                  post={post}
                />
              </div>
              <div className={abstract.input_wrapper}>
                <label>Neighborhood :</label>
                <Select
                  values={neighborhoods}
                  label="Choose a neighborhood"
                  disabled={!post.city}
                  setTrueValue={setPost}
                  selectName="neighborhood"
                  post={post}
                />
              </div>
              <div className={abstract.input_wrapper}>
                <label>Category :</label>
                <Select
                  values={categories}
                  label="Choose a category"
                  setTrueValue={setPost}
                  selectName="category"
                  post={post}
                />
              </div>
            </div>
            <div className={abstract.input_wrapper}>
              <label>Description :</label>
              <input
                type="text"
                placeholder="Write a description"
                name="description"
                value={post.description}
                onChange={handleChange}
              />
            </div>
            <DragAndDrop photo={photo} handlePhoto={handlePhoto} />
            <button className={abstract.primary_button} onClick={onSubmit}>
              {!isUpdate ? "Share post" : "Update"}
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default PostFormModel;
