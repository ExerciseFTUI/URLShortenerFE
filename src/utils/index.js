import axios from "axios";

export async function apiGetUserData() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/auth/login/success`,
    { withCredentials: true }
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
