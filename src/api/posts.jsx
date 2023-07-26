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