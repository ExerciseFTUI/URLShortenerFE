import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { ButtonLink } from "../../components/button/"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"
import QRInput from "../QRCodes/QRInput"

function EditLinkPage() {
  const LINK_ID = useLocation().pathname.split("/")[3]

  const [destinationLink, setDestinationLink] = useState("")
  const [title, setTitle] = useState("")
  const [domain, setDomain] = useState("")

  function handleSubmit(e) {
    if (destinationLink.length < 3) {
      e.preventDefault()
      alert("Input destination Link!")
    }
  }

  return (
    <div
      id="history-link"
      className="bg-light w-screen min-h-screen p-4 py-8 md:p-16"
    >
      <form
        className="bg-light text-dark-2 shadow-md shadow-grey rounded-md flex flex-col justify-center relative z-[1] px-4 py-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl mb-8">Edit Link</h1>

        <QRInput
          name="Destination Link"
          placeholder="Edit destination link"
          required={true}
          value={destinationLink}
          onChange={setDestinationLink}
          className="mb-8 max-w-4xl"
        />

        <QRInput
          name="Title"
          placeholder="Edit title"
          value={title}
          onChange={setTitle}
          className="mb-8 max-w-4xl"
        />

        <QRInput
          name="Domain"
          placeholder="Edit domain link"
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

          <button type="submit" className="btn-dark rounded-md">
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
    </div>
  )
}

export default EditLinkPage
