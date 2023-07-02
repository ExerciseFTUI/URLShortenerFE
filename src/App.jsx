import React from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"

// import NavBar from "./components/NavBar"
// import Footer from "./components/Footer"

function App() {
  return (
    <>
      <ScrollRestoration />

      {/* <NavBar /> */}

      <Outlet />

      {/* <Footer /> */}
    </>
  )
}

export default App
