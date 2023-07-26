//Ignore this file

import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const QrCodeContext = createContext(null);

export const QrCodeContextProvider = ({ children }) => {
  const queryClient = useQueryClient();

  async function apiAddQr(file, userId, url, title, customColor) {
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

  const value = {
    queryClient,
    apiAddQr,
  };

  return (
    <QrCodeContext.Provider value={value}>{children}</QrCodeContext.Provider>
  );
};
