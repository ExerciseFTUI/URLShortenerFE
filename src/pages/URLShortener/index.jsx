import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify"
import { QRCode } from "react-qrcode-logo"

import { apiPostShorten } from "../../utils"

import QRInput from "../QRCodes/QRInput"

import logo from "../../assets/exe-logo-with-bg.png"
import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"

function URLShortenerPage() {
  const [destinationLink, setDestinationLink] = useState("")
  const [title, setTitle] = useState("")
  const [custom, setCustom] = useState("")

  const [tryQR, setTryQR] = useState(false)

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const userId = sessionStorage.getItem("userId")

  const tempLink = sessionStorage.getItem("tempLink")

  const location = useLocation()

  useEffect(() => {
    if (tempLink) setDestinationLink(tempLink)
  }, [tempLink])

  useEffect(() => {
    sessionStorage.removeItem("tempLink")
  }, [location])

  const mutation = useMutation({
    mutationFn: () =>
      apiPostShorten({
        user_id: userId,
        full_url: destinationLink,
        short_url: custom,
      }),
    onSuccess: () => {
      // queryClient.invalidateQueries(["getAll", userId]);
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

      setTryQR(true)
      //   setTimeout(() => {
      //     navigate("/url-shortener/history")
      //   }, 1000)
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

  const shortenLink = (e) => {
    e.preventDefault()

    if (isValidUrl(destinationLink)) {
      mutation.mutate()
    } else {
      toast.warn("Invalid destination url", {
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

  return (
    <div
      id="url-shortener-feature-page"
      className="bg-light text-dark-2 min-h-screen relative py-6 flex-center flex-col gap-6"
    >
      <h1 className="drop-shadow-lg text-3xl md:text-5xl">Create New</h1>

      <p className="text-lg mb-8">Create New Custom Shorten Link</p>

      <form className="flex flex-col mb-8 lg:w-[540px]">
        <QRInput
          placeholder="Destination link here"
          value={destinationLink}
          onChange={setDestinationLink}
          required={true}
          name="Link"
          className="w-full mb-6"
        />

        <QRInput
          placeholder="Custom Link (optional)"
          value={custom}
          onChange={setCustom}
          className="w-full mb-6"
          name="Custom"
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
          {custom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="font-medium text-lg mb-1">Preview</p>
              <p className="bg-light outline-none border-b-2 border-dark-2 w-full py-1 px-4 text-lg">
                ex.tech/{custom}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          title="submit-link"
          name="submit-link"
          type="button"
          onClick={shortenLink}
          className="btn-dark rounded-md self-end mt-4"
        >
          Create Link
        </button>
      </form>

      <AnimatePresence>
        {tryQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-light flex-center gap-4 absolute top-1/4 z-10 p-12 border-dark-2 border-2 rounded-md drop-shadow-lg shadow-xl shadow-dark"
          >
            <p className="font-medium text-lg">
              Want to make the link into a QR Code?
            </p>

            <QRCode
              value="https://www.ex.tech/"
              ecLevel="H"
              enableCORS
              size={196}
              logoImage={logo}
              logoPadding={2}
              fgColor="#1C465C"
              removeQrCodeBehindLogo
              id="landing-qr-code"
            />

            <p className="font-medium text-lg">
              Try our QR Code feature!{" "}
              <span>
                <Link to="/qr-code/default" className="underline">
                  Get Here
                </Link>
              </span>
            </p>

            <button
              title="close"
              onClick={() => setTryQR(false)}
              className="absolute top-2 right-2 underline text-sm italic"
            >
              close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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

export default URLShortenerPage

function isValidUrl(urlString) {
  let url
  try {
    url = new URL(urlString)
  } catch (e) {
    return false
  }
  return url.protocol === "http:" || url.protocol === "https:"
}
