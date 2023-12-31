import { useState,  } from "react";
import { useNavigate } from "react-router-dom"
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

function DefaultQR() {
  const navigate = useNavigate()

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userId = sessionStorage.getItem("userId");

  const mutation = useMutation({
    mutationFn: () =>
      apiAddQr(
        null, //File field didnt exist
        userId,
        link, // Use the 'link' state
        title, // Use the 'title' state
        null //Custom Color field didnt exist
      ),
    onSuccess: () => {
      // setTitle("");
      // setLink("");
      setErrorMessage("");
      //Download Qr
      download();
      toast.success("Your QR Code has been successfully generated");
      setTimeout(() => {
            navigate("/qr-codes/history-qr")
      }, 2500)
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
      toast.error(error.response.data.message);
    },
  });

  const handleAddQr = () => {
    mutation.mutate();
  };

  function download() {
    if (link.length == 0) return;

    let imageData = document
      .getElementById("default-qr-code")
      .toDataURL("image/png");
    saveAs(imageData, title);
  }

  return (
    <div
      id="qr-codes-default"
      className="flex-center flex-col lg:flex-row lg:gap-16"
    >
      <div className="bg-light flex-center flex-col-reverse gap-4 border-2 border-dark-2 p-4 pb-8 rounded-xl">
        <h1 className="font-semibold text-3xl w-fit max-w-4xl pt-2">
          {title || "My QR Code"}
        </h1>

        <div className="border-2 border-dark-2 rounded-sm">
          <QRCode
            value={link}
            ecLevel="H"
            enableCORS
            size={256}
            logoImage={logo}
            logoPadding={2}
            removeQrCodeBehindLogo
            id="default-qr-code"
          />
        </div>
      </div>

      <form className="flex flex-col mb-8 lg:w-[540px]">
        <QRInput
          placeholder="Destination link here"
          value={link}
          onChange={setLink}
          required={true}
          name="Link"
          className="w-full mb-6"
        />

        <QRInput
          placeholder="Title (optional)"
          value={title}
          onChange={setTitle}
          className="w-full mb-6"
          name="Title"
          maxLength={16}
        />

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

export default DefaultQR;
