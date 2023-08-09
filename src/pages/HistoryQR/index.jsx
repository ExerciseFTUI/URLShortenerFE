import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ToastContainer, toast } from "react-toastify"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

import { apiDeleteShorten, apiGetAllLinks } from "../../utils"

import { ButtonLink } from "../../components/button/"
import QRCard from "./QRCard"
import HexaBorder from "../../components/hexagonAnim/HexaBorder"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"
import iLink from "../../assets/history/link.svg"
import iQR from "../../assets/history/qr-code.svg"

const tempData = [
    {
        _id: "614a64ca2d9c1bfa65dc8aca0388",
        userId: "64ca2a0fc0b7b315977d8a94",
        url: "https://www.github.com",
        shortUrl: "Hn1x24v",
        qrLogo: "https://res.cloudinary.com/drqkbrgsu/image/upload/v1690971548/urlshort…",
        title:"Github",
        customColor: "#000000",
    },
    {
        _id:"64ccfb1828e0a1cd9547af7b",
        userId: "64cca12dc4c8e0ff88db7970",
        url: "https://docs.google.com/spreadsheets/d/1TqL0jiISVoRaD5oFwqH0QCAwyZIhQl…",
        shortUrl: "tf8KIvS",
        qrLogo: "https://res.cloudinary.com/drqkbrgsu/image/upload/v1691155223/urlshort…",
        title: "Bug Tracker",
        customColor: "#173a69",
    }
]

const currentlyLoading = false

function HistoryQr() {
  const queryClient = useQueryClient()
  const userId = sessionStorage.getItem("userId")

  const handleDelete = async (params) => {
    // TODO: delete
  }

  return (
    <div
      id="history-link"
      className="bg-light w-screen h-[100vh] min-h-screen p-4 py-8 md:p-16"
    >
      <div className="bg-dark-2 h-full rounded-md flex flex-col">
        <div className="relative z-[1] pt-4 md:pt-12 px-4 md:px-12">
          <h1 className="text-3xl">My History</h1>

          <div className="w-fit flex items-end gap-4">
            <p className="h-fit">Create new custom shorten link</p>

            <Link
              to="/url-shortener/create"
              className="text-2xl h-fit -mb-0.5 hover:scale-125 ease-in-out duration-150"
            >
              +
            </Link>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              title="Shorten Links History"
              type="button"
              onClick={""}
              className="origin-bottom-left hover:scale-110 ease-in-out duration-150 pointer-events-auto"
            >
              <img src={iLink} className="w-6 h-6"/>
            </button>
            <button
              title="QR Code History"
              type="button"
              onClick={""}
              className="origin-bottom-left hover:scale-110 ease-in-out duration-150 pointer-events-auto"
            >
              <img src={iQR} className="w-7 h-7"/>
            </button>
          </div>
        </div>

        <motion.div
          id="history-link-lists"
          animate={{
            transition: {
              staggerChildren: 0.5,
            },
          }}
          className="relative z-[1] mt-8 w-full flex items-start justify-start flex-wrap gap-4 overflow-y-auto pb-4 md:pb-4 px-4 md:px-12"
          style={{
            height:
            currentlyLoading || tempData.length == 0
                ? "100%"
                : "auto",
          }}
        >
          {/* prettier-ignore */}
          <AnimatePresence >
            {currentlyLoading ? 
            (
              <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="bg-light w-full h-full flex-center flex-row gap-4 rounded-md p-4 text-center"
              >
                <HexaBorder duration={2.5} theme="dark" className="w-12" />
              </motion.div>
            ) 
            : tempData.length > 0 ? 
            (
              tempData.map((qr, i) => <QRCard key={i} qr={qr} handleDelete={handleDelete} />)
            ) : 
            (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="bg-light w-full md:h-full flex-center rounded-md p-4 text-center"
              >
                <h1 className="text-dark-2 text-xl md:text-3xl mb-4">
                  Shorten your links today!
                </h1>

                <ButtonLink
                  theme="dark"
                  title="Create your first link"
                  width="fit"
                  className="px-2 rounded-lg text-base md:text-lg"
                  to="/url-shortener/create"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

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

export default HistoryQr
