import React from "react"
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom"

import Sidebar from "./components/sidebar"

function App() {
  if (useLocation().pathname == "/") {
    return <Navigate to="/summary" />
  }

  return (
    <>
      <ScrollRestoration />

      <Outlet />

      <Sidebar />
    </>
  )
}

export default App
