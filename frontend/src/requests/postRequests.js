import api from "../services/api";

export async function savePost(email, password, type, isSaved, id) {
  const uri = isSaved ? "save" : "unsave";
  const res = await api(email, password).get(`${type}_item/${uri}/${id}`);
  return res;
}

export async function getPost(email, password, type, id) {
  const res = await api(email, password).get(`${type}_item/get_post/${id}`);
  return res;
}

export async function createPost(email, password, type, post, file) {
  const formData = new FormData();
  formData.append(
    "post",
    new Blob([JSON.stringify(post)], { type: "application/json" })
  );
  formData.append("file", file);
  //   formData.append("post", post);
  const res = await api(email, password, "multipart/form-data").post(
    `${type}_item/create`,
    formData
  );
  return res.data;
}

export async function updatePost(email, password, type, post, file) {
  const formData = new FormData();
  formData.append(
    "post",
    new Blob([JSON.stringify(post)], { type: "application/json" })
  );
  formData.append("file", file);
  //   formData.append("post", post);
  const res = await api(email, password, "multipart/form-data").put(
    `${type}_item/update_post/${post.id}`,
    formData
  );
  return res.data;
}

export async function deletePost(email, password, type, id) {
  const res = await api(email, password).delete(
    `${type}_item/delete_post/${id}`
  );
  return res.data;
}

/*--ABSTRACTS--*/

export async function getCities(email, password) {
  const res = await api(email, password).get("location/cities");
  return res.data;
}

export async function getNeighborhoods(email, password, id) {
  if (!id) return null;
  const res = await api(email, password).get(`location/neighborhoods/${id}`);
  return res.data;
}

export async function getCategories(email, password) {
  const res = await api(email, password).get("categories");
  return res.data;
}
