import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { ButtonLink } from "../../components/button/"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"
import QRInput from "../QRCodes/QRInput"

import { apiPutShorten } from "../../utils"
import { useMutation } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"

function EditLinkPage() {
  const LINK_ID = useLocation().pathname.split("/")[3]
  const navigate = useNavigate()

  const [shorts, setShorts] = useState("")
  const [destinationLink, setDestinationLink] = useState("")
  const [domain, setDomain] = useState("")

  const mutation = useMutation({
    mutationFn: () =>
      apiPutShorten(
        {
          _id: LINK_ID,
          full_url: destinationLink,
          short_url: shorts,
        }
      ),
    onSuccess: () => {
      toast.success("Your short url has been successfully generated", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {navigate("/url-shortener/history")}, 1000);
    },
    onError: (error) => {
      toast.warn("Failed to generate short url", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {}, 3000);
    },
  });

  const updateLink = () => {
    if(destinationLink != "" && shorts != "") {
      if (isValidUrl(destinationLink)) {
          mutation.mutate();
      } else {
          toast.warn("Please fill in the form", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
    }else{
      if (shorts.length > 3) {
        mutation.mutate();
      }else{
        toast.warn("Invalid custom link", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
    }
  }

  return (
    <div
      id="history-link"
      className="bg-light w-screen min-h-screen p-4 py-8 md:p-16"
    >
      <form
        className="bg-light text-dark-2 shadow-md shadow-grey rounded-md flex flex-col justify-center relative z-[1] px-4 py-8"
      >
        <h1 className="text-3xl mb-8">Edit Link</h1>

        <QRInput
          name="Custom Link"
          placeholder="Edit custom link"
          value={shorts}
          onChange={setShorts}
          className="mb-8 max-w-4xl"
        />

        <QRInput
          name="Destination Link"
          placeholder="Edit destination link (optional)"
          required={true}
          value={destinationLink}
          onChange={setDestinationLink}
          className="mb-8 max-w-4xl"
        />


        <QRInput
          name="Domain"
          placeholder="Edit domain link (optional)"
          value={domain}
          onChange={setDomain}
          className="mb-8 max-w-4xl"
        />

        <div className="w-full flex justify-end gap-4 max-w-4xl">
          <ButtonLink
            theme="light"
            title="Cancel"
            to="/url-shortener/history"
            className="border-2 border-dark-2 px-2 py-0.5"
          />

          <button onClick={updateLink} type="button" className="btn-dark rounded-md">
            Confirm
          </button>
        </div>
      </form>

      <>
        <img
          alt="background"
          src={bgImage}
          className="absolute w-screen h-full object-cover left-0 top-0 pointer-events-none hidden md:block"
        />

        <img
          alt="background"
          src={bgImageMb}
          className="absolute w-full h-screen object-cover left-0 top-0 pointer-events-none md:hidden"
        />
      </>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default EditLinkPage

function isValidUrl(urlString){
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};
