import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import HexaParticles from "../../components/hexagon/HexaParticles"

function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [sended, setSended] = useState(false)

  const handleChange = (e, set) => set(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email.length < 13 || email.length > 50 || !email.includes("@")) {
      alert("Enter the correct email!")
    } else {
      setSended(true)
      /* Send Reset Password Link */
    }
  }

  useEffect(() => {
    if (email.length == 0) setSended(false)
  }, [email])

  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  }

  return (
    <div id="reset-password" className="text-dark-2">
      <div className="site-wrapper w-container flex-center flex-col gap-8 text-center h-[100vh]">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl">
            Reset Your Password
          </h1>
          <p>Enter your email address for a secure password recovery link</p>
        </div>

        <form
          className="space-y-4 w-full max-w-lg text-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter Your Email"
            minLength={13}
            maxLength={50}
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
            className="outline-none border-dark-2 border-2 rounded-md text-center h-12 w-full"
          />

          <button
            type="submit"
            className="bg-dark-2 text-light py-2 px-6 rounded-sm hover:scale-105 ease-linear duration-100"
          >
            Send Link
          </button>
        </form>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={sended ? "open" : "closed"}
          variants={variants}
          className="space-y-4"
        >
          <p className="bg-dark-2 text-grey text-xs rounded-full w-fit px-2 py-2">
            ✓ The link has been sent! Please check your mail inbox.
          </p>

          <p className="text-grey-2 font-medium">
            Go to{" "}
            <Link to="/account/login" className="underline underline-offset-4">
              login page
            </Link>
          </p>
        </motion.div>
      </div>

      <HexaParticles angle="counter-clockwise" />
    </div>
  )
}

export default ResetPasswordPage
