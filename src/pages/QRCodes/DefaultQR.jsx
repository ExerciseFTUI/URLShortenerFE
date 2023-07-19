import { useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { saveAs } from "file-saver"

import QRInput from "./QRInput"

import logo from "../../assets/exe-logo-with-bg.png"

function DefaultQR() {
  const [link, setLink] = useState("")
  const [title, setTitle] = useState("")

  function download() {
    if (link.length == 0) return

    let imageData = document
      .getElementById("default-qr-code")
      .toDataURL("image/png")
    saveAs(imageData, title)
  }

  return (
    <div
      id="qr-codes-default"
      className="flex-center flex-col lg:flex-row lg:gap-16"
    >
      <div className="flex-center flex-col-reverse gap-4 border-2 border-dark-2 p-4 pb-8 rounded-xl">
        <h1 className="font-semibold text-3xl w-fit max-w-4xl pt-2">
          {title || "My QR Code"}
        </h1>

        <div className="border-2 border-dark-2 rounded-sm">
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
        </div>
      </div>

      <form className="flex flex-col mb-8 lg:w-[540px]">
        <QRInput
          placeholder="Destination link here"
          value={link}
          onChange={setLink}
          required={true}
          name="Link"
          className="w-full mb-6"
        />

        <QRInput
          placeholder="Title (optional)"
          value={title}
          onChange={setTitle}
          className="w-full mb-6"
          name="Title"
          maxLength={16}
        />

        <button
          type="button"
          className="btn-dark font-medium rounded-md md:text-lg"
          onClick={download}
        >
          Download
        </button>
      </form>
    </div>
  )
}

export default DefaultQR
