import React, { useState } from "react";
import DragAndDrop from "../../components/DragAndDrop";
import Select from "../../components/Select";
import abstract from "../../styles/abstract.module.css";
import styles from "../../styles/createpost.module.css";

const CITIES = ["casablanca", "khouribga"];
const NEIGHBORS = ["neighborhood1", "alohabebe"];

function CreatePost() {
  // const [type, setType] = useState("lost");
  // const [title, setTitle] = useState("");
  // const [city, setCity] = useState("");
  // const [neighborhood, setNeighborhood] = useState("");
  // const [date, setDate] = useState("");
  // const [description, setDescription] = useState("");
  const [post, setPost] = useState({
    type: "lost",
    title: "",
    city: "",
    neighborhood: "",
    date: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPost((e) => ({ ...e, [name]: value }));
    // console.log(name);
  }

  function handlePostType(value) {
    setPost((e) => ({ ...e, type: value }));
    // console.log(value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    // const post = {
    //   title,
    //   type,
    //   city,
    //   neighborhood,
    //   date,
    //   description,
    // };
    console.log(post);
  }

  return (
    <div className={abstract.basic_form_container}>
      <div className={styles.header}>
        <div className={styles.subtitle}>Choose the type of your post</div>
        <div className={styles.type_choice}>
          <button
            onClick={() => handlePostType("lost")}
            className={post.type === "lost" ? styles.type_lost : ""}
          >
            LOST
          </button>
          <div></div>
          <button
            onClick={() => handlePostType("found")}
            className={post.type === "found" ? styles.type_found : ""}
          >
            FOUND
          </button>
        </div>
      </div>
      <form className={abstract.basic_form}>
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
        <div className={abstract.inputs_container}>
          <div className={abstract.input_wrapper}>
            <label>City :</label>
            <Select
              values={CITIES}
              label="Choose a city"
              setTrueValue={setPost}
              selectName="city"
            />
          </div>
          <div className={abstract.input_wrapper}>
            <label>Neighborhood :</label>
            <Select
              values={NEIGHBORS}
              label="Choose a neighborhood"
              disabled={!post.city}
              setTrueValue={setPost}
              selectName="neighborhood"
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
        <DragAndDrop />
        <button className={abstract.primary_button} onClick={onSubmit}>
          Share post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
