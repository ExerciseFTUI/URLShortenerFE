import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"

import { ButtonLink } from "../../components/button"

function LinkCard({ link, handleDelete }) {
  const [isWantToDelete, setIsWantToDelete] = useState(false)

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
    handleDelete(link._id)
    setIsWantToDelete(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText("exer.space/" + link.short)

    toast.success("Short URL has been copied to the clipboard!", {
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
        <h1 className="text-xl">{link.title || "Title"}</h1>

        <div className="space-x-1">
          <button
            title="copy"
            type="button"
            onClick={handleCopy}
            className="origin-bottom-left hover:scale-125 ease-in-out duration-150 pointer-events-auto"
          >
            <svg
              stroke="#1C465C"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none"
            >
              <path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
              <path d="M4 22h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2zm2-10h6v2H6v-2zm0 4h6v2H6v-2z"></path>
            </svg>
          </button>

          <button
            title="delete"
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

      <a
        href={`${import.meta.env.VITE_BASE_URL}/${link.short}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm overflow-clip"
      >
        Short : <span className="underline">exer.space/{link.short}</span>
      </a>

      <Link to={link.full} className="text-sm overflow-clip">
        Full <span className="ml-3.5">:</span>{" "}
        <span className="underline">{link.full}</span>
      </Link>

      <p className="font-light text-xs mt-1.5">Clicked : {link.clicks}</p>

      <div className="flex justify-between">
        <p className="font-light text-xs mt-1.5">
          {formatDate(link.created_at)}
        </p>

        <ButtonLink
          theme="dark"
          title="Edit"
          to={`/url-shortener/edit-link/${link._id}`}
          className="text-sm py-0.5 px-2"
        />
      </div>
    </motion.div>
  )
}

export default LinkCard
