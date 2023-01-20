import { AddPhotoAlternate, Photo } from "@mui/icons-material";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "../styles/draganddrop.module.css";

function DragSentence() {
  return (
    <div className={styles.drag_sentence_container}>
      <div>
        Drag and drop or
        <span className={styles.drag_sentence_upload}>upload</span>the item's
        photo
      </div>
      <div className={styles.photo_wrapper}>
        <AddPhotoAlternate />
      </div>
    </div>
  );
}

function DraggedPhoto({ name }) {
  return (
    <div className={styles.dragged_photo_container}>
      <div className={styles.photo_wrapper}>
        <Photo sx={{ fontSize: 40 }} />
      </div>
      <div className={styles.dragged_photo_name}>{name}</div>
    </div>
  );
}

function DragAndDrop({ photo, handlePhoto }) {
  // const [photo, setPhoto] = useState(null);
  const [isFilesPicked, setIsFilesPicked] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  function handleChange(e, type) {
    const data = type === "drop" ? e.dataTransfer : e.target;
    handlePhoto(data.files[0]);
    setIsFilesPicked(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave() {
    setDragActive(false);
  }

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e, "drop");
    }
  };

  return (
    <label
      className={classNames(styles.drag_and_drop_container, {
        [styles.drag_and_drop_filled]: isFilesPicked && !dragActive,
      })}
      htmlFor="dnd-input"
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {!isFilesPicked && <DragSentence />}
      {isFilesPicked && (
        <div
          className={styles.drag_and_drop_inner_wrapper}
          id="drag-file-element"
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {dragActive ? <DragSentence /> : <DraggedPhoto name={photo.name} />}
        </div>
      )}
      <input
        className={styles.drag_and_drop_input}
        type="file"
        id="dnd-input"
        onChange={(e) => handleChange(e, "input")}
      />
    </label>
  );
}

export default DragAndDrop;
