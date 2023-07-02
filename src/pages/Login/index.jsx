import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import InputText from "../../components/inputText"
import HexaParticles from "../../components/hexagon/HexaParticles"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const [proper, setProper] = useState(false)

  const handleSubmit = (e) => {
    if (
      (username.length < 3 && password.length < 8) ||
      username.length > 20 ||
      password.length > 20
    ) {
      alert("Please enter the correct username and password!")
      e.preventDefault()
    } else {
      /* send login request to the server */
    }
  }

  /* Button disabling */
  useEffect(() => {
    if (username.length >= 3 && password.length >= 8) setProper(true)
    else if (username.length > 20 || password.length > 20) setProper(false)
    else setProper(false)
  }, [username, password])

  return (
    <div
      id="login-page"
      className="site-wrapper w-container flex-center flex-col gap-4 h-[100vh] relative overflow-hidden"
    >
      <div className="text-center xl:mb-4">
        <h1 className="text-4xl xl:text-6xl">Welcome!</h1>
        <p className="italic text-grey-1 text-sm mt-4 xl:text-lg">
          Sign in to experience the superpowers, Sign Up for a fresh start.
        </p>
      </div>

      <form
        className="text-lg text-grey flex flex-col w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <InputText name="username" content={username} onChange={setUsername} />
        <InputText
          type="password"
          name="password"
          content={password}
          onChange={setPassword}
          minLength={8}
        />

        <div className="text-sm flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <input
              placeholder="Remember me"
              type="checkbox"
              defaultChecked={username}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <p>Remember me</p>
          </div>

          <Link
            to="/account/reset-password"
            className="italic underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="bg-dark-2 text-light text-lg rounded-sm py-3 disabled:bg-dark-1 disabled:text-grey-2 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 linear duration-75"
          disabled={!proper}
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-grey-1">
        Don't have an account?{" "}
        <Link
          to="/account/register"
          className="italic underline underline-offset-4"
        >
          Sign up!
        </Link>
      </p>

      <HexaParticles background="#0D2734" color="#527182" />
    </div>
  )
}

export default LoginPage
