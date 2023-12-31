import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ToastContainer, toast } from "react-toastify"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

import { apiGetQr } from "../../utils"

import { ButtonLink } from "../../components/button/"
import LinkCard from "./QrCard"
import HexaBorder from "../../components/hexagonAnim/HexaBorder"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"

const currentlyLoading = false

function HistoryQr() {
  const userId = sessionStorage.getItem("userId")

  const postQuery = useQuery({
    queryKey: ["getAllQr", userId],
    queryFn: () => apiGetQr(userId),
  })

  if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>

  return (
    <div
      id="history-link"
      className="bg-light w-screen h-[100vh] min-h-screen p-4 py-8 md:p-16"
    >
      <div className="bg-dark-2 h-full rounded-md flex flex-col">
        <div className="relative z-[1] pt-4 md:pt-12 px-4 md:px-12">
          <h1 className="text-3xl">My QR Codes</h1>

          <div className="w-fit flex items-end gap-4">
            <p className="h-fit">Create new qr codes</p>

            <Link
              to="/qr-codes/default"
              className="text-2xl h-fit -mb-0.5 hover:scale-125 ease-in-out duration-150"
            >
              +
            </Link>
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
            postQuery.isLoading || postQuery.data.payload.length == 0
                ? "100%"
                : "auto",
          }}
        >
          {/* prettier-ignore */}
          <AnimatePresence >
            {postQuery.isLoading ? 
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
            : postQuery.data.payload.length > 0 ? 
            (
              postQuery.data.payload.map((link, i) => <LinkCard key={i} link={link} userId={userId} />)
            ) : 
            (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="bg-light w-full md:h-full flex-center rounded-md p-4 text-center"
              >
                <h1 className="text-dark-2 text-xl md:text-3xl mb-4">
                  Create your own qr codes today!
                </h1>

                <ButtonLink
                  theme="dark"
                  title="Create your first qr code"
                  width="fit"
                  className="px-2 rounded-lg text-base md:text-lg"
                  to="/qr-codes/default"
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
