import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/exe-logo-with-bg.png";
import { logout } from "../../utils";

const navs = [
  { text: "History Links", to: "/url-shortener/history", path: "history" },
  { text: "Custom Links", to: "/url-shortener/create", path: "create" },
  { text: "QR Codes", to: "/qr-codes/default", path: "qr-codes" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const userName =
    sessionStorage.getItem("name") === null
      ? "User Guest"
      : sessionStorage.getItem("name");
  
  const profilePic = 
    sessionStorage.getItem("avatar") === null
      ? logo
      : sessionStorage.getItem("avatar");

  const [opened, setOpened] = useState(false);
  const [account, setAccount] = useState(false);


  function toggleSide() {
    setOpened(!opened);
  }

  function handleLogOut() {
    logout();
  }

  function handleLogin() {
    navigate("/account/login");
  }

  return (
    <aside
      id="sidebar"
      className={`bg-dark-1 text-lg fixed top-0 h-full px-8 py-16 flex flex-col justify-between z-20 border-grey-2 border-r-2 ease-in-out duration-500 ${
        opened ? "left-0" : "-left-[194px]"
      }`}
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
          className={`ease-in-out duration-300 ${
            opened ? "rotate-0" : "rotate-180"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      <div className="overflow-hidden ease-in-out duration-300">
        <Link to="/summary" className="btn-light rounded-md mb-4 w-full">
          Home
        </Link>

        <div className="bg-light w-full h-[1px] mb-6" />

        <ul className="space-y-4">
          {navs.map(({ text, to, path }, i) => (
            <li key={i} className="font-medium">
              <Link
                onClick={toggleSide}
                to={to}
                className={`relative before:bg-light before:absolute before:bottom-2 before:h-0.5 ${
                  location.includes(path) ? "before:w-full" : "before:w-0"
                } before:ease-in-out before:duration-300 hover:before:w-full before:opacity-80`}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-auto w-32">
        <button
          title="user"
          type="button"
          onClick={() => setAccount(!account)}
          className="bg-light w-full py-2 rounded-md flex items-center justify-center border-b-2 gap-2 border-dark-2 relative z-[1]"
        >
          <img
            alt="profile picture"
            src={profilePic}
            className="w-8 h-8 rounded-full border-dark-2 border-2"
          />

          <h1 className="text-dark-2 text-base overflow-hidden line-clamp-1">
            {userName.split(" ")[1]}
          </h1>
        </button>

        <AnimatePresence>
          {account && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              className="text-dark-2 text-center flex flex-col justify-center items-center -mt-1 origin-top"
            >
              {
                sessionStorage.getItem("name") === null ? (
                  <button
                    title="login"
                    type="button"
                    onClick={handleLogin}
                    className="bg-light w-full py-2 font-semibold rounded-b-md"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    title="log out"
                    type="button"
                    onClick={handleLogOut}
                    className="bg-light w-full py-2 font-semibold rounded-b-md"
                  >
                    Log Out
                  </button>
                )
              }
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

export default Sidebar;
