import { useRef, useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { saveAs } from "file-saver"

import QRInput from "./QRInput"

import logo from "../../assets/exe-logo-with-bg.png"

function CustomQR() {
  const [link, setLink] = useState("")
  const [title, setTitle] = useState("")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [QRColor, setQRColor] = useState("#000000")
  const [icon, setIcon] = useState(logo)
  const [iconName, setIconName] = useState("")

  const uploadRef = useRef(null)

  function download() {
    let imageData = document
      .getElementById("default-qr-code")
      .toDataURL("image/png")
    saveAs(imageData, title)
  }

  function handleUploadIcon(e) {
    let file = e.target.files[0]

    file && setIconName(file.name)

    file && setIcon(URL.createObjectURL(file))
  }

  return (
    <div
      id="qr-codes-custom"
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

        <div
          id="upload-icon"
          className="border-b-2 border-dark-2 flex justify-between px-4 py-1"
        >
          <p className="font-normal text-grey-2 text-lg">
            {iconName || "Choose a File"}
          </p>

          <input
            ref={uploadRef}
            title="Upload Image"
            type="file"
            accept="image/*"
            onChange={handleUploadIcon}
            className="bg-light w-0"
          />

          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="28px"
            width="28px"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => uploadRef.current.click()}
          >
            <path
              fill="none"
              strokeWidth="1"
              d="M1,17 L1,23 L23,23 L23,17 M12,2 L12,19 M5,9 L12,2 L19,9"
            ></path>
          </svg>
        </div>

        <div
          id="input-bg-color"
          className="border-b-2 border-dark-2 flex justify-between px-4 py-1"
        >
          <p className="font-normal text-grey-2 text-lg">
            Background [ {bgColor} ]
          </p>

          <input
            title="bg-color"
            type="color"
            onChange={(e) => setBgColor(e.target.value)}
            value={bgColor}
            className="bg-light border-none w-[30%] cursor-pointer"
          />
        </div>

        <div
          id="input-qr-color"
          className="border-b-2 border-dark-2 flex justify-between px-4 py-1"
        >
          <p className="font-normal text-grey-2 text-lg">
            QR Color [ {QRColor} ]
          </p>

          <input
            title="qr-color"
            type="color"
            onChange={(e) => setQRColor(e.target.value)}
            value={QRColor}
            className="bg-light border-none w-[30%] cursor-pointer"
          />
        </div>
      </form>

      <div className="text-center flex-center flex-col gap-4">
        <QRCode
          value={link}
          ecLevel="H"
          enableCORS
          size={256}
          bgColor={bgColor}
          fgColor={QRColor}
          logoImage={icon}
          logoPadding={2}
          removeQrCodeBehindLogo
          id="default-qr-code"
        />

        <h1 className="font-medium text-3xl border-dark-2 border-b-2 pb-2 w-full max-w-4xl">
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

export default CustomQR
