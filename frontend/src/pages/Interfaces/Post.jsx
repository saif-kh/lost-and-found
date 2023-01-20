import React, { useContext, useEffect, useState } from "react";
import GoBack from "../../components/GoBack";
import styles from "../../styles/post.module.css";
import abstract from "../../styles/abstract.module.css";
import PostFormModel from "../../components/models/PostFormModel";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/store/auth";
import { deletePost, getPost } from "../../requests/postRequests";
import api, { baseURL } from "../../services/api";
import classNames from "classnames";
import PostCard from "../../components/PostCard";

function Post() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [post, setPost] = useState({
    type: "",
    title: "",
    city: "",
    neighborhood: "",
    date: "",
    imageName: "",
    category: "",
    description: "",
  });
  const { userState } = useContext(UserContext);
  const { user } = userState;
  const email = user?.email;
  const password = user?.password;
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { type, id } = useParams();
  const query = "lost_item";
  const [showRelated, setShowRelated] = useState(false);

  async function fetchPosts(query, page, id) {
    try {
      const res = await api(email, password).get(`${query}/${id}/${page}`);
      const { content, totalPages } = res.data;
      setPosts(content);
      setTotalPages(totalPages);
      console.log("res is : ", res);
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    fetchPosts(query, page, id);
  }, [page, user, id]);

  async function fetchPost(id) {
    const res = await getPost(email, password, type, id);
    const { data } = res;
    console.log("data", data);
    setPost(data);
  }

  useEffect(() => {
    if (type === "lost") setShowRelated(true);
  }, [type]);

  useEffect(() => {
    fetchPost(id);
  }, [id, user]);

  // useEffect(() => console.log(post), [post]);

  const navigate = useNavigate();

  async function handleDelete() {
    const res = await deletePost(email, password, post.type, post.id);
    console.log(res);
    navigate("/user/my-posts");
  }

  const handleModalClose = () => setIsModelOpen(false);

  return (
    <div className={styles.post_page}>
      <div className={styles.post_container}>
        <div className={styles.post_header}>
          <div className={styles.post_goback}>
            <GoBack path="/user/my-posts" name="My posts" />
          </div>
          <div className={styles.post_head}>
            {post.type === "lost" ? (
              <span className={styles.post_type}>LOST ITEM : </span>
            ) : (
              <span className={styles.post_type}>FOUND ITEM : </span>
            )}
            <span className={styles.post_title}>{post.title}</span>
          </div>
        </div>
        <div className={styles.post_tags_wrapper}>
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
        <div className={styles.post_main_content_wrapper}>
          <div className={styles.post_photo_wrapper}>
            <img src={`${baseURL}download/${post.imageName}`} alt="photo" />
          </div>
          <div className={styles.post_right_side}>
            <div className={styles.post_description}>Description :</div>
            <div>{post.description}</div>
            <div className={styles.post_buttons_wrapper}>
              {/* <button
                className={`${abstract.primary_button}`}
                onClick={() => setIsModelOpen(true)}
              >
                Update
              </button> */}
              <button
                className={`${abstract.primary_button}`}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <PostFormModel
        isUpdate={true}
        post={post}
        setPost={setPost}
        isOpen={isModelOpen}
        onClose={handleModalClose}
      />
      {showRelated && (
        <div className={styles.related_posts_container}>
          <div className={styles.related_posts_header}>
            <div className={styles.related_posts_header_rey}></div>
            <div className={styles.related_posts_header_title}>
              Related posts
            </div>
            <div className={styles.related_posts_header_rey}></div>
          </div>
          <div className={styles.related_posts_wrapper}>
            <div className={styles.cards_wrapper}>
              {posts?.map((post, i) => {
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
      )}
    </div>
  );
}

export default Post;
