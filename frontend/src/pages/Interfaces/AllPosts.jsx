import classNames from "classnames";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PostCard from "../../components/PostCard";
import SearchBar from "../../components/SearchBar";

import api from "../../services/api";
import styles from "../../styles/displayposts.module.css";
import abstract from "../../styles/abstract.module.css";
import { Tune, TuneRounded } from "@mui/icons-material";
import { UserContext } from "../../context/store/auth";

//zid state dial filter is open bch ila kan close dir search bchi lakhur

function AllPosts() {
  const { userState } = useContext(UserContext);
  const { user } = userState;
  const email = user?.email;
  const password = user?.password;
  const query = "/all_posts";
  const _query = "/search";
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    postType: "",
    dateStart: "",
    dateEnd: "",
    category: "",
    city: "",
    neighborhood: "",
  });

  function resetTitle() {
    setTitle("");
  }

  function changeTitle(value) {
    setTitle(value);
  }

  async function fetchPosts(email, password, query, page) {
    const res = await api(email, password).get(`${query}/${page}`);
    const { content, totalPages } = res.data;
    // console.log(content);
    setPosts(content);
    setTotalPages(totalPages);
  }

  async function fetchPostsbyName(email, password, query, page, title) {
    const res = await api(email, password).get(
      `${query}/${page}?title=${title}`
    );
    const { content, totalPages } = res.data;
    // console.log(content);
    setPosts(content);
    setTotalPages(totalPages);
  }

  function onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFilter((e) => ({ ...e, [name]: value }));
  }

  function nullFilter(filter) {
    const { postType, dateStart, dateEnd, category, city, neighborhood } =
      filter;
    if (
      postType === "" &&
      dateStart === "" &&
      dateEnd === "" &&
      category === "" &&
      city === "" &&
      neighborhood === ""
    ) {
      return null;
    } else {
      return filter;
    }
  }

  async function fetchByFilter() {
    // console.log("post :", filter);
    const res = await api(email, password).post(
      `filter/${page}`,
      nullFilter(filter)
    );
    const { content, totalPages } = res.data;
    // console.log(content);
    setPosts(content);
    setTotalPages(totalPages);
  }

  async function onSubmit(e) {
    e.preventDefault();
    fetchByFilter();
  }

  // useEffect(() => console.log(filter), [filter]);

  useEffect(() => setPage(0), [isFilterOpen]);

  useEffect(() => {
    if (!isFilterOpen) {
      if (title === "") {
        // console.log("fetching");
        fetchPosts(email, password, query, page);
      } else {
        fetchPostsbyName(email, password, _query, page, title);
      }
    } else {
      fetchByFilter();
    }
  }, [page, title, isFilterOpen, user]);

  return (
    <div className={styles.main_container}>
      <div className={styles.head}>
        <div className={styles.header}>
          <SearchBar
            setPage={setPage}
            resetTitle={resetTitle}
            changeTitle={changeTitle}
          />
          <button
            className={styles.filters_button}
            onClick={() => setIsFilterOpen((e) => !e)}
          >
            <div>
              <TuneRounded />
            </div>
            <div>Filters</div>
          </button>
        </div>
        <form
          className={classNames(styles.filters_container, {
            [styles.filters_container_open]: isFilterOpen,
          })}
        >
          <div className={styles.filters_row}>
            <div>
              <label htmlFor="">PostType :</label>
              <input
                type="text"
                placeholder="Insert type"
                name="postType"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="">DateStart :</label>
              <input
                type="text"
                placeholder="yyyy-mm-dd"
                name="dateStart"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="">DateEnd :</label>
              <input
                type="text"
                placeholder="yyyy-mm-dd"
                name="dateEnd"
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.filters_row}>
            <div>
              <label htmlFor="">Category :</label>
              <input
                type="text"
                placeholder="Insert category"
                name="category"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="">City :</label>
              <input
                type="text"
                placeholder="Insert city"
                name="city"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="">Neighborhood :</label>
              <input
                type="text"
                placeholder="Insert neighborhood"
                name="neighborhood"
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.filters_buttons_wrapper}>
            <button
              type="reset"
              className={`${abstract.secondary_button} ${abstract.small_button}`}
            >
              clear
            </button>
            <button
              onClick={onSubmit}
              className={`${abstract.primary_button} ${abstract.small_button}`}
            >
              Search
            </button>
          </div>
        </form>
      </div>
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
  );
}

export default AllPosts;
