import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import useDownloader from 'react-use-downloader';

import { ButtonLink } from "../../components/button"
import { QRCode } from "react-qrcode-logo"

import logo from "../../assets/exe-logo-with-bg.png";
import iDownload from "../../assets/history/download.svg"

function QrCard({ qr, handleDelete }) {
  const [isWantToDelete, setIsWantToDelete] = useState(false)

  //qr code
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [QRColor, setQRColor] = useState("#000000");
  const [icon, setIcon] = useState(logo);
  const [iconName, setIconName] = useState("");

  function formatDate(inputDate) {
    const date = new Date(inputDate)
    const jakartaTimeZone = "Asia/Jakarta"

    const formattedDateTime = date.toLocaleString("en-US", {
      timeZone: jakartaTimeZone,
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })

    return formattedDateTime
  }

  function deleteLink() {
    handleDelete(qr._id)
    setIsWantToDelete(false)
  }

  function handleDownload() {

    toast.success("QR Code has been downloaded!", {
      position: "top-center",
      autoClose: 300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-light text-dark-2 h-fit min-w-[310px] max-w-sm px-4 py-3 flex flex-1 flex-col rounded-md overflow-hidden ease-in-out duration-200 relative"
    >
      <div className="flex justify-between">
        <h1 className="text-xl">{qr.title || "Title"}</h1>

        <div className="space-x-1">
          <button
            title="Download QR"
            type="button"
            onClick={handleDownload}
            className="origin-bottom-left hover:scale-y-125 ease-in-out duration-150 pointer-events-auto"
          >
            <img src={iDownload} className="w-6 h-6" />
          </button>

          <button
            title="Delete QR"
            type="button"
            onClick={() => setIsWantToDelete(!isWantToDelete)}
            className="origin-bottom hover:scale-y-125 ease-in-out duration-150"
          >
            <svg
              stroke="#1C465C"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
            </svg>
          </button>

          <AnimatePresence>
            {isWantToDelete && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                className="absolute top-1 right-1 bg-light px-4 py-1 border-dark-2 border-2 rounded-md text-center z-10 origin-top-right"
              >
                <p className="text-xs">Delete?</p>

                <div className="text-xs flex mt-1.5">
                  <button
                    title="yes"
                    type="button"
                    onClick={deleteLink}
                    className="mr-2 hover:underline ease-in-out duration-200"
                  >
                    Yes
                  </button>

                  <button
                    title="no"
                    type="button"
                    onClick={() => setIsWantToDelete(!isWantToDelete)}
                    className="hover:underline ease-in-out duration-200"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Link to={qr.full} title="Source Link" className="text-sm overflow-clip truncate h-5 pr-2">
        Source <span className="ml-1.5">:</span>{" "}
        <span className="underline">{qr.url}</span>
      </Link>

      <div className="w-fitrounded-sm">
          <QRCode
            value={link}
            ecLevel="H"
            enableCORS
            size={80}
            bgColor={bgColor}
            fgColor={QRColor}
            logoImage={icon}
            logoPadding={2}
            removeQrCodeBehindLogo
            id="default-qr-code"
          />
        </div>

      <div className="flex justify-between">
        <p className="font-light text-xs mt-1.5">
          {formatDate(qr.created_at)}
        </p>

        <ButtonLink
          theme="dark"
          title="Edit"
          to={`/url-shortener/edit-link/${qr._id}`}
          className="text-sm py-0.5 px-2"
        />
      </div>
    </motion.div>
  )
}

export default QrCard
