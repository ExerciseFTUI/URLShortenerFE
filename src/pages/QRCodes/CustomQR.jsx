import { useRef, useState } from "react"
import { Link } from "react-router-dom"

import QRInput from "./QRInput"

import qr from "../../assets/qr-codes.png"

function CustomQR() {
  const [link, setLink] = useState("")
  const [title, setTitle] = useState("")
  const [color, setColor] = useState("#0D2734")
  const [icon, setIcon] = useState(null)
  const [iconName, setIconName] = useState("")

  const uploadRef = useRef(null)

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
          id="input-custom-color"
          className="border-b-2 border-dark-2 flex justify-between px-4 py-1"
        >
          <p className="font-normal text-grey-2 text-lg">
            Choose Custom Color [ {color} ]
          </p>

          <input
            title="custom-color"
            type="color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
            className="bg-light border-none w-1/2 cursor-pointer"
          />
        </div>
      </form>

      <div className="text-center flex-center flex-col gap-4">
        <img alt="qr-codes" src={qr} className="w-64 h-64" />

        <h1 className="font-medium text-3xl border-dark-2 border-b-2 pb-2 w-full max-w-4xl">
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

export default CustomQR
