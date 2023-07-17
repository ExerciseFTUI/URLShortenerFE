import { useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { saveAs } from "file-saver"

import QRInput from "./QRInput"

import logo from "../../assets/exe-logo-with-bg.png"

function DefaultQR() {
  const [link, setLink] = useState("")
  const [title, setTitle] = useState("")

  function download() {
    let imageData = document
      .getElementById("default-qr-code")
      .toDataURL("image/png")
    saveAs(imageData, title)
  }

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
        <QRCode
          value={link}
          ecLevel="H"
          enableCORS
          size={256}
          logoImage={logo}
          logoPadding={2}
          removeQrCodeBehindLogo
          id="default-qr-code"
        />

        <h1 className="font-medium text-3xl border-dark-2 border-b-2 pb-1 w-full max-w-4xl">
          {title || "Title"}
        </h1>

        <button
          type="button"
          className="btn-light font-medium md:text-lg"
          onClick={download}
        >
          Download here
        </button>
      </div>
    </div>
  )
}

export default DefaultQR
