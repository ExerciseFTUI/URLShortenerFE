import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddQr, apiGetQr } from "../../api/posts";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const QrDashboard = () => {
  const queryClient = useQueryClient();
  const userId = "649c4fcc9a55a185a920af5a";

  const [selectedFile, setSelectedFile] = useState(null); //State to hold the selected file
  const [url, setUrl] = useState(""); // State to hold the URL input value
  const [title, setTitle] = useState(""); // State to hold the title input value
  const [errorMessage, setErrorMessage] = useState(null); // State to hold the error message

  const notify = (message) => toast(message); //Toast

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getQrByUserId", userId],
    queryFn: () => apiGetQr(userId),
  });

  const mutation = useMutation({
    mutationFn: () =>
      apiAddQr(
        selectedFile,
        userId,
        url, // Use the 'url' state
        title // Use the 'title' state
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["getQrByUserId", userId]);

      setSelectedFile(null);
      setTitle("");
      setUrl("");
      setErrorMessage("");
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  const handleAddQr = async () => {
    mutation.mutate();
  };

  return (
    <div className="w-full max-width-[1440px] mx-auto px-6 sm:px-16 py-6">
      <div className="flex flex-col justify-center items-center">
        <div className="">
          <ul>
            {data.payload?.map((data) => (
              <li key={data._id}>
                <a
                  href={`${import.meta.env.VITE_BASE_URL}/qr/${data.shortUrl}`}
                >
                  {data.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-light bg-opacity-20 p-5 shadow-xl rounded-xl mt-10">
          <div className="flex flex-col gap-2">
            {mutation.isError && (
              <p className="font-bold text-[#ef4444] "> {errorMessage} </p>
            )}

            <label>URL :</label>
            <input
              type="text"
              className="text-dark bg-light px-2 py-1 rounded-xl"
              value={url} // Use the 'url' state
              onChange={handleUrlChange} // Handle URL input change
            />

            <label>Title :</label>
            <input
              type="text"
              className="text-dark bg-light px-2 py-1 rounded-xl"
              value={title} // Use the 'title' state
              onChange={handleTitleChange} // Handle title input change
            />
          </div>
          <div className="flex gap-5 items-center mt-10">
            <label className="btn bg-grey rounded-3xl py-2 px-4 hover:bg-grey-2">
              Upload File
              <input
                type="file"
                name="filename"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </label>

            <button
              type="button"
              className="btn bg-grey rounded-3xl py-2 px-4  hover:bg-grey-2"
              onClick={handleAddQr}
            >
              Add New Qr
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
