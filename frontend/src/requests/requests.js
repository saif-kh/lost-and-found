import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export async function signUp(user) {
  const res = await api().post("user/create", user);
  return res.data;
}

export async function login(email, password) {
  const res = await api(email, password).get("user/get_user");
  return res.data;
}

export async function getPost(email, password) {
  const res = await api(email, password).get("lost_item/get_post/3");
  return res.data;
}

export async function getCities(email, password) {
  const res = await api(email, password).get("location/cities");
  return res.data;
}

export async function getNeighborhoods(email, password, id) {
  if (!id) return null;
  const res = await api(email, password).get(`location/neighborhoods/${id}`);
  return res.data;
}

// async function signUp(user) {
//   const res = await api().get("user/hi");
//   return res.data;
// }

// async function getPost() {
//     const res = await api().get
// }

// export { signUp, getPost, login };

export function useFetch(query, page, email, password) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api(email, password).get(`${query}/${page}`);
      console.log("page", page);
      console.log("content", res.data.content);
      setList((prev) => [...prev, ...res.data.content]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery();
    console.log("request sent");
  }, [page]);

  return { loading, error, list };
}

export function useTitle() {
  const [title, setTitle] = useState("");
  const [matches, setMatches] = useState([]);

  function resetTitle() {
    setTitle("");
  }

  function changeTitle(value) {
    setTitle(value);
  }

  const getPostByName = useCallback(async () => {
    try {
      const res = await api(email, password).get(``);
      // console.log("content", res.data.content);
      setMatches((prev) => [...prev, ...res.data.content]);
    } catch (err) {
      throw err;
    }
  }, [title]);

  useEffect(() => {
    if (title !== "") getPostByName();
    console.log("request sent");
  }, [title]);

  return { matches, resetTitle, changeTitle };
}
