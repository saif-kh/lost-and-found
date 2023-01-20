import React, { useContext, useState } from "react";
import UserTag from "./UserTag";
import styles from "../styles/postcard.module.css";
import abstract from "../styles/abstract.module.css";
import usertag from "../styles/usertag.module.css";
import classNames from "classnames";
import CheckPostModel from "./models/CheckPostModel";
import { Link, useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { baseURL } from "../services/api";
import { deletePost, savePost } from "../requests/postRequests";
import { UserContext } from "../context/store/auth";

function PostCard({ post, mine = false }) {
  const { userState } = useContext(UserContext);
  const me = userState.user;
  const email = me?.email;
  const password = me?.password;
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(post.save);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    const res = await deletePost(email, password, post.type, post.id);
    console.log(res);
    // navigate("/user/my-posts");
  }

  async function handleSave(e) {
    const res = await savePost(email, password, post.type, !isSaved, post.id);
    console.log(res);
    setIsSaved((x) => !x);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  }
  const user = post.person;
  const handleModalClose = () => setIsModelOpen(false);
  return (
    <div>
      <div
        className={classNames(styles.card_container, {
          [styles.lost_container]: post.type === "lost",
          [styles.found_container]: post.type === "found",
        })}
      >
        {!mine && (
          <div className={`${styles.user_tag} ${usertag.small_container}`}>
            <UserTag firstname={user.firstName} lastname={user.lastName} />
          </div>
        )}
        <div className={styles.photo_wrapper}>
          <img src={`${baseURL}download/${post.imageName}`} alt="photo" />
        </div>
        <div className={styles.main_content_wrapper}>
          <div className={styles.tags_wrapper}>
            <div>
              <span>Category : </span>
              {post.category}
            </div>
            <div>
              <span>City : </span>
              {post.city}
            </div>
            <div>
              <span>Neighborhood : </span>
              {post.neighborhood}
            </div>
            <div>
              <span>Date : </span>
              {post.date}
            </div>
          </div>
          <div className={styles.post_header}>
            {post.type === "lost" ? (
              <span className={styles.post_type}>LOST ITEM : </span>
            ) : (
              <span className={styles.post_type}>FOUND ITEM : </span>
            )}
            <span className={styles.post_title}>{post.title}</span>
          </div>
          <div className={styles.post_description}>{post.description}</div>
          {!mine ? (
            <div className={styles.post_buttons_wrapper}>
              <button
                className={`${styles.save_button} ${abstract.small_button}`}
                onClick={handleSave}
              >
                <div className={styles.save_button_text}>
                  {!isSaved ? "Save" : "Saved"}
                </div>
                <div
                  className={classNames(styles.save_button_icon, {
                    [styles.did_click]: animate,
                  })}
                >
                  {!isSaved ? (
                    <FavoriteBorder sx={{ fontSize: 17 }} />
                  ) : (
                    <Favorite sx={{ fontSize: 17 }} />
                  )}
                </div>
              </button>
              <button
                onClick={() => setIsModelOpen(true)}
                className={`${abstract.primary_button} ${abstract.small_button}`}
              >
                Learn more
              </button>
            </div>
          ) : (
            <div className={styles.post_buttons_wrapper}>
              <Link to={`/user/post/${post.type}/${post.id}`}>
                <button
                  className={`${abstract.primary_button} ${abstract.small_button}`}
                >
                  Learn more
                </button>
              </Link>
              <button
                className={`${abstract.danger_button} ${abstract.small_button}`}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <CheckPostModel
        post={post}
        isOpen={isModelOpen}
        onClose={handleModalClose}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
      />
    </div>
  );
}

export default PostCard;
