import { Navigate, Outlet, useLocation } from "react-router-dom"

import { ButtonLink } from "../../components/button"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"

function QRCodes() {
  const place = useLocation().pathname.split("/")[2]

  if (!place) {
    return <Navigate to="default" />
  }

  return (
    <div
      id="qr-codes-feature-page"
      className="bg-light text-dark-2 min-h-screen relative py-6"
    >
      <div className="site-wrapper w-container relative z-[1]">
        <div
          id="qr-codes-choose"
          className="w-full flex justify-between gap-6 flex-col md:flex-row mb-12"
        >
          <div className="flex">
            <ButtonLink
              title="Default"
              to="default"
              theme={place == "default" ? "dark" : "light"}
              className="px-4 py-2 shadow-md shadow-grey rounded-sm block h-fit mr-2"
            />

            <ButtonLink
              title="Custom"
              to="custom"
              theme={place == "custom" ? "dark" : "light"}
              className="px-4 py-2 shadow-md shadow-grey rounded-sm block h-fit"
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

export default QRCodes
