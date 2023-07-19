import { Outlet, useLocation } from "react-router-dom"

import { ButtonLink } from "../../components/button"

function QRCodes() {
  const place = useLocation().pathname.split("/")[2]

  return (
    <div
      id="qr-codes-feature-page"
      className="bg-light text-dark-2 min-h-screen relative py-6"
    >
      <div className="site-wrapper w-container">
        <div
          id="qr-codes-choose"
          className="w-full flex justify-between gap-6 flex-col md:flex-row mb-12"
        >
          <div className="flex">
            <ButtonLink
              title="Default"
              to="default"
              theme={place == "default" ? "dark" : "light"}
              className="px-4 shadow-md shadow-grey rounded-sm block h-fit mr-2"
            />

            <ButtonLink
              title="Custom"
              to="custom"
              theme={place == "custom" ? "dark" : "light"}
              className="px-4 shadow-md shadow-grey rounded-sm block h-fit"
            />
          </div>

          <div className="">
            <h1 className="font-semibold text-3xl drop-shadow-lg">
              {place[0].toUpperCase() + place.slice(1, place.length)} QR Code
            </h1>

            <p className="font-light text-lg drop-shadow-md">Select a style</p>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default QRCodes
