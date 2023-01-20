import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import SearchBar from "../../components/SearchBar";
import { UserContext } from "../../context/store/auth";
import api from "../../services/api";
import styles from "../../styles/displayposts.module.css";

const POSTS = [
  {
    id: 5,
    title: "lost keys",
    type: "lost",
    category: "Electronics",
    location: "Casablanca",
    date: "02/03/2020",
    description: "very very long description",
    person: {
      id: 1,
      firstName: "Bob",
      lastName: "mark",
      email: "test@gmail.com",
    },
  },
];

function SavedPosts() {
  const { userState } = useContext(UserContext);
  const { user } = userState;
  const email = user?.email;
  const password = user?.password;
  const query = "/my_saved_posts";
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchSavedPosts(email, password, query, page) {
    const res = await api(email, password).get(`${query}/${page}`);
    const { content, totalPages } = res.data;
    // console.log(content);
    setPosts(content);
    setTotalPages(totalPages);
  }

  useEffect(() => {
    fetchSavedPosts(email, password, query, page);
  }, [page, user]);

  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        <div className={styles.disp_title}>Saved Posts</div>
      </div>
      <div>
        <div className={styles.cards_wrapper}>
          {posts.map((post, i) => {
            return <PostCard key={i} post={post} />;
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
    </div>
  );
}

export default SavedPosts;
