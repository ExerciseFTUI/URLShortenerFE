import axios from "axios";
import { useNavigate } from "react-router";

axios.defaults.withCredentials = true;

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/login/success`,
        { withCredentials: true }
      );
      if (!sessionStorage.getItem("name")) {
        sessionStorage.setItem("userId", data.user._id);
        sessionStorage.setItem("name", data.user.name);
      }
    } catch (error) {
      if (error.response.status === 401) {
        sessionStorage.clear();
        sessionStorage.setItem(
          "error",
          "Cookie Expired!! Please log in again."
        );
        window.open(`/login`, "_self");
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export async function logout(setLoading) {
  try {
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    sessionStorage.clear();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false)
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
//=================================================Need to Login

export async function apiUpdateUser(userId, updatedData) {
  const { data } = await axiosPrivate.put(
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
  const { data } = await axiosPrivate.post(
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
  return axiosPrivate
    .get(`${import.meta.env.VITE_BASE_URL}/qr/getQrByUserId/${user_id}`)
    .then((res) => res.data);
}

export async function apiGetSingleQr(qr_id) {
  return axiosPrivate
    .get(`${import.meta.env.VITE_BASE_URL}/qr/getSingleQr/${qr_id}`)
    .then((res) => res.data);
}

export function apiGetAllLinks(user_id) {
  return axiosPrivate
    .get(`${import.meta.env.VITE_BASE_URL}/url/${user_id}`)
    .then((res) => res.data);
}

export function apiPostShorten({ user_id, title, full_url, short_url }) {
  const data = {
    user_id: user_id,
    title: title,
    full_url: full_url,
    short_url: short_url,
  };

  return axiosPrivate
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

  return axiosPrivate
    .put(`${import.meta.env.VITE_BASE_URL}/update`, data)
    .then((res) => res.data);
}

export function apiDeleteShorten(_id) {
  return axiosPrivate
    .delete(`${import.meta.env.VITE_BASE_URL}/delete/${_id}`)
    .then((res) => res.data);
}

export function apiSearchShorten(_id) {
  return axiosPrivate
    .get(`${import.meta.env.VITE_BASE_URL}/search/${_id}`)
    .then((res) => res.data);
}
