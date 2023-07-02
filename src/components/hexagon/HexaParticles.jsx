import { useCallback, useMemo } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

function HexaParticles({
  background = "#F0F0F0",
  direction = "right",
  color = "#889DA8",
  angle = "clockwise",
}) {
  /* Particle JS settings */
  const options = useMemo(() => {
    return {
      autoPlay: true,
      background: {
        color: {
          value: background,
        },
        opacity: 1,
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      detectRetina: true,
      duration: 0,
      fpsLimit: 60,
      interactivity: {
        detectsOn: "window",
        events: {
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          value: "#15394A",
        },
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0,
          },
          direction: direction,
          enable: true,
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          random: false,
          size: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1080,
            height: 1080,
          },
          value: 24,
        },
        reduceDuplicates: true,
        shape: {
          type: "polygon",
          fill: false,
          polygon: {
            sides: 6,
          },
          stroke: {
            width: 1,
            color: color,
          },
        },
        size: {
          random: {
            enable: true,
            minimumValue: 12,
          },
          value: 24,
        },
        rotate: {
          value: 360,
          direction: angle,
          random: {
            enable: true,
            minimumValue: 270,
          },
          animation: {
            enable: true,
            speed: 8,
          },
        },
        collisions: {
          bounce: {
            horizontal: {
              random: {
                enable: true,
                minimumValue: 0.5,
              },
              value: 1,
            },
            vertical: {
              random: {
                enable: true,
                minimumValue: 0.5,
              },
              value: 1,
            },
          },
          enable: true,
          maxSpeed: 5,
          mode: "bounce",
          overlap: {
            enable: false,
            retries: 2,
          },
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      smooth: false,
      zLayers: 100,
    }
  }, [])

  const particlesInit = useCallback((engine) => {
    loadSlim(engine)
  }, [])

  return <Particles init={particlesInit} options={options} />
}

export default HexaParticles
