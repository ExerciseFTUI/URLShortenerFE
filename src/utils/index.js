import axios from "axios";
import { useNavigate } from "react-router";

axios.defaults.withCredentials = true;

export async function logout() {
  try {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`);
    sessionStorage.clear();
  } catch (error) {
    console.error(error);
  } finally {
    window.open(`/login`, "_self");
  }
}

export async function apiGetUserData() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/auth/login/success`,
    { withCredentials: true }
  );

  return data;
}

export async function apiUpdateUser(userId, updatedData) {
  const { data } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/updateUser/${userId}`,
    updatedData
  );
  return data;
}

export async function apiAddQr(file, userId, url, title, customColor) {
  const formData = new FormData();

  const fieldsToAppend = [
    { name: "userId", value: userId },
    { name: "url", value: url },
    { name: "filename", value: file },
    { name: "title", value: title },
    { name: "customColor", value: customColor },
  ];

  for (const { name, value } of fieldsToAppend) {
    if (value) {
      formData.append(name, value);
    }
  }

  console.log(formData);

  // Call API
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/qr/addQr`,
    formData,
    {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return;
}

export async function apiGetQr(user_id) {
  return axios
    .get(`${import.meta.env.VITE_BASE_URL}/qr/getQrByUserId/${user_id}`)
    .then((res) => res.data);
}

export async function apiGetSingleQr(qr_id) {
  return axios
    .get(`${import.meta.env.VITE_BASE_URL}/qr/getSingleQr/${qr_id}`)
    .then((res) => res.data);
}

export function apiGetAllLinks(user_id) {
  return axios
    .get(`${import.meta.env.VITE_BASE_URL}/url/${user_id}`)
    .then((res) => res.data);
}

export function apiPostShorten({ user_id, title, full_url, short_url }) {
  if (!title) {
    title = "Title";
  }
  const data = {
    user_id: user_id,
    title: title,
    full_url: full_url,
    short_url: short_url,
  };

  return axios
    .post(`${import.meta.env.VITE_BASE_URL}/create`, data)
    .then((res) => res.data);
}

export function apiPutShorten({ _id, title, full_url, short_url }) {
  const data = {
    _id: _id,
    title: title,
    full_url: full_url,
    short_url: short_url,
  };

  return axios
    .put(`${import.meta.env.VITE_BASE_URL}/update`, data)
    .then((res) => res.data);
}

export function apiDeleteShorten(_id) {
  return axios
    .delete(`${import.meta.env.VITE_BASE_URL}/delete/${_id}`)
    .then((res) => res.data);
}

export function apiSearchShorten(_id) {
  return axios
    .get(`${import.meta.env.VITE_BASE_URL}/search/${_id}`)
    .then((res) => res.data);
}
