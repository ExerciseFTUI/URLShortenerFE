import React from "react"

import { motion } from "framer-motion"

import hexaBord from "../../assets/hexagonals/hexa-border.svg"

function HexaBorder({
  duration = 8,
  initial = Math.random() * 100,
  className = "",
}) {
  return (
    <motion.img
      alt="Hexagonal"
      src={hexaBord}
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
