import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"

import { ButtonLink } from "../../components/button/"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"
import QRInput from "../QRCodes/QRInput"

import { apiPutShorten, apiSearchShorten } from "../../utils"
import { useMutation } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"
import HexaBorder from "../../components/hexagonAnim/HexaBorder"

function EditLinkPage() {
  const LINK_ID = useLocation().pathname.split("/")[3]
  const navigate = useNavigate()

  const [shorts, setShorts] = useState("")
  const [destinationLink, setDestinationLink] = useState("")
  const [title, setTitle] = useState("")

  const queries = useQuery({
    queryKey: ["getUrl", LINK_ID],
    queryFn: () => apiSearchShorten(LINK_ID),
    onSuccess: (data) => {
      setShorts(data.results.short)
      setDestinationLink(data.results.full)
      setTitle(data.results.title)
    }
  })

  const mutation = useMutation({
    mutationFn: () =>
      apiPutShorten({
        _id: LINK_ID,
        title: title,
        full_url: destinationLink,
        short_url: shorts,
      }),
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
      })
      setTimeout(() => {
        navigate("/url-shortener/history")
      }, 1000)
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
      })
      setTimeout(() => {}, 3000)
    },
  })

  const updateLink = () => {
    if (destinationLink != "" && shorts != "") {
      if (isValidUrl(destinationLink)) {
        mutation.mutate()
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
        })
      }
    } else {
      if (shorts.length > 3) {
        mutation.mutate()
      } else {
        toast.warn("Invalid custom link", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }
  }

  if (queries.isError) {
    return <div>{JSON.stringify(queries.error)}</div>
  }

  return (
    <div
      id="history-link"
      className="bg-light text-dark-2 min-h-screen relative py-6 flex-center flex-col gap-6"
    >
      <h1 className="drop-shadow-lg text-3xl md:text-5xl">Edit Link</h1>

      <p className="text-lg mb-8">Edit Your Link</p>

      {queries.isLoading ? (
        <div className="flex-center">
          <HexaBorder duration={2.5} theme="dark" className="w-12" />
        </div>
      ) : (
        <form className="flex flex-col mb-8 lg:w-[540px]">
          <QRInput
            placeholder="Edit custom link"
            value={shorts}
            onChange={setShorts}
            required={true}
            name="Custom Link"
            className="w-full mb-6"
          />

          <QRInput
            placeholder="Edit Destination Link (optional)"
            value={destinationLink}
            onChange={setDestinationLink}
            className="w-full mb-6"
            name="Destination Link"
            required={true}
            maxLength={16}
          />

          <QRInput
            placeholder="Title (optional)"
            value={title}
            onChange={setTitle}
            className="w-full mb-6"
            name="Title"
            maxLength={16}
          />

          <AnimatePresence>
            {destinationLink && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-medium text-lg mb-1">Preview</p>
                <p className="bg-light outline-none border-b-2 border-dark-2 w-full py-1 px-4 text-lg">
                  ex.tech/{shorts}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full flex justify-end gap-4 max-w-4xl mt-6">
            <ButtonLink
              theme="light"
              title="Cancel"
              to="/url-shortener/history"
              className="border-2 border-dark-2 px-2 py-0.5"
            />

            <button
              onClick={updateLink}
              type="button"
              className="btn-dark rounded-md"
            >
              Confirm
            </button>
          </div>
        </form>)}
      

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

function isValidUrl(urlString) {
  let url
  try {
    url = new URL(urlString)
  } catch (e) {
    return false
  }
  return url.protocol === "http:" || url.protocol === "https:"
}
