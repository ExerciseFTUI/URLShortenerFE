import { useState } from "react"
import { Link } from "react-router-dom"

import QRInput from "./QRInput"

import qr from "../../assets/qr-codes.png"

function DefaultQR() {
  const [link, setLink] = useState("")
  const [title, setTitle] = useState("")

  return (
    <div
      id="qr-codes-default"
      className="flex flex-col lg:flex-center lg:flex-row lg:gap-16"
    >
      <form className="flex flex-col gap-6 mb-8 lg:w-[540px]">
        <div className="flex">
          <QRInput
            placeholder="Destination link here"
            value={link}
            onChange={setLink}
            required={true}
            className="w-full"
          />

          <button type="button" className="btn-dark px-4 rounded-r-md">
            Preview
          </button>
        </div>

        <QRInput
          placeholder="Title (optional)"
          value={title}
          onChange={setTitle}
          className="w-full"
          maxLength={16}
        />
      </form>

      <div className="text-center flex-center flex-col gap-4">
        <img alt="qr-codes" src={qr} className="w-64 h-64" />

        <h1 className="font-medium text-3xl border-dark-2 border-b-2 pb-1 w-full max-w-4xl">
          {title || "Title"}
        </h1>

        <Link
          to="/qr-codes/default"
          className="btn-light font-medium md:text-lg"
        >
          Download here
        </Link>
      </div>
    </div>
  )
}

export default DefaultQR
