import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { ButtonLink } from "../../components/button/"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"

// prettier-ignore
const dummyLinks = [
    { id: 1, title: "Youtube", link: "https://exercice.ui", source: "https://www.youtube.com", date: "19 June 2022" },
    { id: 2, title: "Google", link: "https://exercice.ui", source: "https://www.google.com", date: "23 March 2022" },
    { id: 3, title: "Twitch", link: "https://exercice.ui", source: "https://www.twitch.tv", date: "2 August 2022" },
    { id: 4, title: "Youtube", link: "https://exercice.ui", source: "https://www.youtube.com", date: "19 June 2022" },
    { id: 5, title: "Google", link: "https://exercice.ui", source: "https://www.google.com", date: "23 March 2022" },
    { id: 6, title: "Twitch", link: "https://exercice.ui", source: "https://www.twitch.tv", date: "2 August 2022" },
    { id: 7, title: "Youtube", link: "https://exercice.ui", source: "https://www.youtube.com", date: "19 June 2022" },
    { id: 8, title: "Google", link: "https://exercice.ui", source: "https://www.google.com", date: "23 March 2022" },
    { id: 9, title: "Twitch", link: "https://exercice.ui", source: "https://www.twitch.tv", date: "2 August 2022" },
]

function HistoryLinkPage() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    setLinks(dummyLinks)
  }, [])

  function deleteLink() {
    return
  }

  return (
    <div
      id="history-link"
      className="bg-light w-screen h-[100vh] min-h-screen p-4 py-8 md:p-16"
    >
      <div className="bg-dark-2 h-full rounded-md flex flex-col">
        <div className="relative z-[1] pt-4 md:pt-12 px-4 md:px-12">
          <h1 className="text-3xl">My Links</h1>

          <div className="w-fit flex items-end gap-4">
            <p className="h-fit">Create new custom shorten link</p>

            <Link
              to="/url-shortener/create"
              className="text-2xl h-fit -mb-0.5 hover:scale-125 ease-in-out duration-150"
            >
              +
            </Link>
          </div>
        </div>

        <div
          id="history-link-lists"
          className="relative z-[1] mt-8 w-full h-full flex items-start justify-evenly flex-wrap gap-2 overflow-y-auto pb-4 md:pb-4 px-4 md:px-12"
        >
          {links.length > 1 ? (
            links.map((l, i) => (
              <div
                key={i}
                className="bg-light text-dark-2 h-fit w-full max-w-sm px-4 py-3 flex flex-col rounded-md"
              >
                <div className="flex justify-between">
                  <Link to={l.link} className="font-semibold text-lg">
                    {l.title}
                  </Link>

                  <button
                    title="delete"
                    type="button"
                    className="text-dark-2 text-lg hover:scale-75 ease-in-out duration-150"
                    onClick={deleteLink}
                  >
                    ✕
                  </button>
                </div>

                <Link to={l.source} className="text-sm underline">
                  {l.source}
                </Link>

                <div className="flex justify-between">
                  <p className="font-light text-xs mt-1.5">{l.date}</p>

                  <ButtonLink
                    theme="dark"
                    title="Edit"
                    to={`/url-shortener/edit-link/${l.id}`}
                    className="text-sm py-0.5 px-2"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="bg-light w-full md:h-full flex-center rounded-md p-4 text-center">
              <h1 className="text-dark-2 text-xl md:text-3xl mb-4">
                Shorten your links today!
              </h1>

              <ButtonLink
                theme="dark"
                title="Create your first link"
                width="fit"
                className="px-2 rounded-lg text-base md:text-lg"
                to="/url-shortener/create"
              />
            </div>
          )}
        </div>
      </div>

      <>
        <img
          alt="background"
          src={bgImage}
          className="absolute w-screen h-full object-cover left-0 top-0 pointer-events-none hidden md:block"
        />

        <img
          alt="background"
          src={bgImageMb}
          className="absolute w-full h-screen object-cover left-0 top-0 pointer-events-none md:hidden"
        />
      </>
    </div>
  )
}

export default HistoryLinkPage
