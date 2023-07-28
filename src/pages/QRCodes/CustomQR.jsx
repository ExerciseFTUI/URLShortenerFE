import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { saveAs } from "file-saver";

import QRInput from "./QRInput";

import logo from "../../assets/exe-logo-with-bg.png";

//React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
//API
import { apiAddQr } from "../../utils";
//React-Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomQR() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [QRColor, setQRColor] = useState("#000000");
  const [icon, setIcon] = useState(logo);
  const [iconName, setIconName] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem("userId");

  const mutation = useMutation({
    mutationFn: () =>
      apiAddQr(
        selectedFile, //File field
        userId,
        link, // Use the 'link' state
        title, // Use the 'title' state
        QRColor //Custom Color field
      ),
    onSuccess: () => {
      //Refetch
      queryClient.invalidateQueries(["getQrByUser", userId]);

      //Reset states value
      // setTitle("");
      // setLink("");
      // setQRColor("");
      // setBgColor("");

      setErrorMessage("");

      //Display Toast
      toast.success("Your QR Code has been successfully generated");
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);

      //Display Toast
      toast.error(error.response.data.message);
    },
  });

  const handleAddQr = () => {
    mutation.mutate();
    download();
  };

  const uploadRef = useRef(null);

  function download() {
    //Post Qr Code to the database
    if (link.length == 0) return;

    let imageData = document
      .getElementById("default-qr-code")
      .toDataURL("image/png");
    saveAs(imageData, title);
  }

  function handleUploadIcon(e) {
    let file = e.target.files[0];

    file && setIconName(file.name);

    file && setIcon(URL.createObjectURL(file));

    file && setSelectedFile(file);
  }

  return (
    <div
      id="qr-codes-custom"
      className="flex flex-col lg:flex-center lg:items-start lg:flex-row lg:gap-16"
    >
      <div className="bg-light flex-center flex-col gap-4 border-2 border-dark-2 p-4 pb-8 rounded-xl">
        <div className="border-2 border-dark-2 rounded-sm">
          <QRCode
            value={link}
            ecLevel="H"
            enableCORS
            size={256}
            bgColor={bgColor}
            fgColor={QRColor}
            logoImage={icon}
            logoPadding={2}
            removeQrCodeBehindLogo
            id="default-qr-code"
          />
        </div>

        <h1 className="font-semibold text-3xl w-fit max-w-4xl pt-2">
          {title || "My QR Code"}
        </h1>
      </div>

      <form className="flex flex-col mb-8 lg:w-[540px]">
        <QRInput
          placeholder="Destination link here"
          value={link}
          onChange={setLink}
          required={true}
          name="Link"
          className="w-full mb-4"
        />

        <QRInput
          placeholder="Title (optional)"
          value={title}
          onChange={setTitle}
          name="Title"
          className="w-full mb-4"
          maxLength={16}
        />

        <label htmlFor="upload-image" className="font-medium text-lg mb-1">
          Upload Image
        </label>

        <div
          id="upload-image"
          className="border-b-2 border-dark-2 flex justify-between px-4 py-1 mb-4"
        >
          <p className="font-normal text-grey-2 text-lg">
            {iconName || "Choose a File"}
          </p>

          <input
            name="upload-image"
            ref={uploadRef}
            title="Upload Image"
            type="file"
            accept="image/*"
            onChange={handleUploadIcon}
            className="bg-light w-0"
          />

          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="28px"
            width="28px"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => uploadRef.current.click()}
          >
            <path
              fill="none"
              strokeWidth="1"
              d="M1,17 L1,23 L23,23 L23,17 M12,2 L12,19 M5,9 L12,2 L19,9"
            ></path>
          </svg>
        </div>

        <label htmlFor="bg-color" className="font-medium text-lg mb-1">
          Background Color
        </label>

        <div
          id="input-bg-color"
          className="border-b-2 border-dark-2 flex justify-between px-4 py-1 mb-4"
        >
          <p className="font-normal text-grey-2 text-lg">
            Background [ {bgColor} ]
          </p>

          <input
            title="bg-color"
            type="color"
            name="bg-color"
            onChange={(e) => setBgColor(e.target.value)}
            value={bgColor}
            className="bg-light border-none w-[30%] cursor-pointer"
          />
        </div>

        <label htmlFor="qr-color" className="font-medium text-lg mb-1">
          QR Color
        </label>

        <div
          id="input-qr-color"
          className="border-b-2 border-dark-2 flex justify-between px-4 py-1 mb-4"
        >
          <p className="font-normal text-grey-2 text-lg">
            QR Color [ {QRColor} ]
          </p>

          <input
            title="qr-color"
            type="color"
            name="qr-color"
            onChange={(e) => setQRColor(e.target.value)}
            value={QRColor}
            className="bg-light border-none w-[30%] cursor-pointer"
          />
        </div>

        <button
          type="button"
          className="btn-dark font-medium rounded-md md:text-lg"
          onClick={handleAddQr}
        >
          Download
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default CustomQR;
