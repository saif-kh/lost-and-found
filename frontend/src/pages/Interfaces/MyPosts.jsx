import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "../../styles/displayposts.module.css";
import abstract from "../../styles/abstract.module.css";
import SearchBar from "../../components/SearchBar";
import PostCard from "../../components/PostCard";
import PostFormModel from "../../components/models/PostFormModel";
import classNames from "classnames";
import api from "../../services/api";
import { UserContext } from "../../context/store/auth";

function MyPosts() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [post, setPost] = useState({
    title: "",
    city: "",
    neighborhood: "",
    date: "",
    category: "",
    description: "",
    keywords: [],
  });

  const { userState } = useContext(UserContext);
  const { user } = userState;
  const email = user?.email;
  const password = user?.password;
  const query = "all_my_posts";
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchPosts(email, password, query, page) {
    try {
      const res = await api(email, password).get(`${query}/${page}`);
      const { content, totalPages } = res.data;
      setPosts(content);
      setTotalPages(totalPages);
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    fetchPosts(email, password, query, page);
  }, [page, user]);

  const handleModalClose = () => setIsModelOpen(false);

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.header}>
          <div className={styles.disp_title}>My Posts</div>
          <button
            className={abstract.primary_button}
            onClick={() => setIsModelOpen(true)}
          >
            Create Post
          </button>
        </div>
        <div className={styles.cards_wrapper}>
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} mine={true} />;
          })}
        </div>
        <div className={styles.pages_buttons_wrapper}>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={classNames(styles.page_button, {
                  [styles.selected_page_button]: page === i,
                })}
              >
                <div>{i + 1}</div>
              </button>
            );
          })}
        </div>
      </div>
      <PostFormModel
        post={post}
        setPost={setPost}
        isOpen={isModelOpen}
        onClose={handleModalClose}
      />
    </>
  );
}

export default MyPosts;
