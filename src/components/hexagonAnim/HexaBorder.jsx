import React from "react"

import { motion } from "framer-motion"

import light from "../../assets/hexagonals/hexa-border.svg"
import dark from "../../assets/hexagonals/hexa-border-dark.svg"

function HexaBorder({
  duration = 8,
  initial = Math.random() * 100,
  className = "",
  theme = "light",
}) {
  return (
    <motion.img
      src={theme == "light" ? light : dark}
      alt="Hexagonal"
      className={className}
      initial={{
        rotate: initial,
      }}
      animate={{
        rotate: 360 + initial,
      }}
      transition={{
        duration: duration,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  )
}

export default HexaBorder
