import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import InputText from "../../components/inputText"
import HexaParticles from "../../components/hexagon/HexaParticles"

function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [strong, setStrong] = useState(false)

  const [proper, setProper] = useState(false)

  const trackPassword = () => {
    if (
      !password.match(/([A-Z])/g) ||
      !password.match(/([0-8])/g) ||
      password.length < 8
    )
      setStrong(false)
    else setStrong(true)
  }

  const handleSubmit = (e) => {
    if (
      (username.length < 3 && password.length < 8) ||
      username.length > 20 ||
      password.length > 20 ||
      email.length < 13 ||
      !email.includes("@")
    ) {
      alert("Please enter the correct email, username, and password!")
      e.preventDefault()
    } else {
      /* send sign up request to the server */
    }
  }

  /* Button disabling */
  /* prettier-ignore */
  useEffect(() => {
    if (username.length >= 3 && password.length >= 8 && email.length >= 13 && email.includes("@"))
      setProper(true)
    else if (username.length > 20 || password.length > 20 || email.length < 13 || !email.includes("@"))
      setProper(false)
    else 
      setProper(false)

    trackPassword()
  }, [username, password, email])

  return (
    <div id="sign-up" className="text-grey-2">
      <div className="site-wrapper w-container h-[100vh] flex-center flex-col gap-4">
        <button className="bg-light text-center rounded-full border-grey-2 border-2 h-12 w-full max-w-lg mb-4 hover:scale-105 linear duration-100">
          Continue with Google
        </button>

        <form
          className="text-lg flex flex-col w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <InputText
            name="username"
            content={username}
            onChange={setUsername}
            className="shadow-sm border-grey-2 border-2"
          />
          <InputText
            name="email"
            content={email}
            onChange={setEmail}
            maxLength={50}
            className="shadow-sm border-grey-2 border-2"
          />
          <InputText
            type="password"
            name="password"
            content={password}
            onChange={setPassword}
            minLength={8}
            className="shadow-sm border-grey-2 border-2"
          />

          <p className="text-xs pl-4 -mt-2 mb-2 italic font-semibold">
            {strong
              ? ""
              : "Password needs to be length of 8 and contain at least one capital letter and one number!"}
          </p>

          <button
            type="submit"
            className="bg-grey-2 border-grey-2 text-light text-lg rounded-sm py-3 my-2 disabled:bg-opacity-0 disabled:text-grey-2 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 disabled:border-2 linear duration-75"
            disabled={!proper}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/account/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>

      <HexaParticles angle="counter-clockwise" direction="left" />
    </div>
  )
}

export default RegisterPage
