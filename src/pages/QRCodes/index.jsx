import { Outlet, useLocation } from "react-router-dom"

import { ButtonLink } from "../../components/button"

function QRCodes() {
  const place = useLocation().pathname.split("/")[2]

  return (
    <div
      id="qr-codes-feature-page"
      className="bg-light text-dark-2 min-h-screen relative mt-20 py-6 px-2 overflow-y-auto"
    >
      <div className="site-wrapper w-container h-full py-6 flex flex-col shadow-sm shadow-grey-1">
        <div id="qr-codes-choose" className="self-end">
          <ButtonLink
            title="Default"
            to="default"
            theme={place == "default" ? "dark" : "light"}
            className="px-4 shadow-md shadow-grey rounded-sm mr-2"
          />

          <ButtonLink
            title="Custom"
            to="custom"
            theme={place == "custom" ? "dark" : "light"}
            className="px-4 shadow-md shadow-grey rounded-sm"
          />
        </div>

        <div className="mb-8">
          <h1 className="font-semibold text-3xl mt-8 drop-shadow-lg">
            {place[0].toUpperCase() + place.slice(1, place.length)} QR Code
          </h1>

          <p className="font-light text-lg drop-shadow-md">Select a style</p>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default QRCodes
