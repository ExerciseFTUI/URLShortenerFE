import axios from "axios";


export function apiGetAllLinks(user_id) {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/url/${user_id}`).then(res => res.data);
}

export function apiPostShorten({ user_id, full_url, short_url }) {
    const data = {
      user_id: user_id,
      full_url: full_url,
      short_url: short_url,
    };
  
    return axios
      .post(`${import.meta.env.VITE_BASE_URL}/create`, data)
      .then((res) => res.data);
  }

export function apiLoginStatus() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/auth/login/success`).then(res => res.data);
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

  return data;
}