import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import QRInput from "../QRCodes/QRInput"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"

import { apiAddLinkShortener } from "../../utils"

function URLShortenerPage() {
  const [destinationLink, setDestinationLink] = useState("")
  const [title, setTitle] = useState("")
  const [custom, setCustom] = useState("")

  function shortenLink(e) {
    const available = apiAddLinkShortener(destinationLink, title, custom)
  }

  return (
    <div
      id="url-shortener-feature-page"
      className="bg-light text-dark-2 min-h-screen relative py-6 flex-center flex-col gap-6"
    >
      <h1 className="drop-shadow-lg text-3xl md:text-5xl">Create New</h1>

      <p className="text-lg mb-8">Create New Custom Shorten Link</p>

      <form onSubmit={shortenLink} className="flex flex-col mb-8 lg:w-[540px]">
        <QRInput
          placeholder="Destination link here"
          value={destinationLink}
          onChange={setDestinationLink}
          required={true}
          name="Link"
          className="w-full mb-6"
        />

        <QRInput
          placeholder="Custom Link"
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
          type="submit"
          className="btn-dark rounded-md self-end mt-4"
        >
          Create Link
        </button>
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
    </div>
  )
}

export default URLShortenerPage
