import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import profile from '../../assets/sidebar/profile.jpg'

const navs = [
  { text: "History Links", to: "/url-shortener/history", path: "history" },
  { text: "Custom Links", to: "/url-shortener/create", path: "create" },
  { text: "QR Codes", to: "/qr-codes/default", path: "qr-codes" },
]

const profName = "Fulan Abdul Wahid"

function Sidebar() {
  const location = useLocation().pathname.split("/")

  const [opened, setOpened] = useState(false)


  function toggleSide() {
    setOpened(!opened)
  }

  //slice profile name into 2 words
  const sliceName = profName.split(" ").slice(0, 2).join(" ")

  // prettier-ignore
  return (
    <aside
      id="sidebar"
      className={`bg-dark-1 text-lg fixed top-0 h-full px-8 py-16 flex flex-col justify-between z-20 border-grey-2 border-r-2 ease-in-out duration-500 ${opened ? "left-0" : "-left-56"}`}
    >
      <div
        onClick={toggleSide}
        className="bg-dark-1 absolute top-4 -right-[41px] p-1 rounded-r-md border-grey-2 border-2 border-l-0 cursor-pointer"
      >
        <svg
          stroke="currentColor"
          fill="#FAFAFA"
          strokeWidth="0"
          viewBox="0 0 20 20"
          aria-hidden="true"
          height="2rem"
          width="2rem"
          xmlns="http://www.w3.org/2000/svg"
          className={`ease-in-out duration-300 ${opened ? "rotate-0" : "rotate-180"}`}
        >
          <path
            fillRule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      <div className="overflow-hidden ease-in-out duration-300">
        <Link to="/summary" className="btn-light rounded-md mb-4 w-full tracking-wider">
          Home
        </Link>

        <div className="bg-light w-full h-[1px] mb-6" />

        <ul className="space-y-4">
          {navs.map(({ text, to, path }, i) => (
            <li key={i} className="font-medium">
              <Link
                onClick={toggleSide}
                to={to}
                className={`relative before:bg-light before:absolute before:bottom-2 before:h-0.5 ${location.includes(path)? "before:w-full" : "before:w-0"} before:ease-in-out before:duration-300 hover:before:w-full before:opacity-80`}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-40 space-x-2 border-2 border-grey-2 p-2 rounded-md overflow-hidden">
        <img src={profile} className="inline-block h-9 w-9 rounded-full"/>
        <p className="text-sm font-bold place-self-center">{sliceName}</p>
      </div>
    </aside>
  )
}

export default Sidebar
