import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { ButtonLink } from "../../components/button/"

import bgImage from "../../assets/backgrounds/hexa-history.png"
import bgImageMb from "../../assets/backgrounds/hexa-history-mb.png"

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"

import { apiDeleteShorten, apiGetAllLinks } from "../../utils"
import { ToastContainer, toast } from "react-toastify"

// prettier-ignore
// const dummyLinks = [
//     { id: 1, title: "Youtube", link: "https://exercice.ui", source: "https://www.youtube.com", date: "19 June 2022" },
//     { id: 2, title: "Google", link: "https://exercice.ui", source: "https://www.google.com", date: "23 March 2022" },
//     { id: 3, title: "Twitch", link: "https://exercice.ui", source: "https://www.twitch.tv", date: "2 August 2022" },
//     { id: 4, title: "Youtube", link: "https://exercice.ui", source: "https://www.youtube.com", date: "19 June 2022" },
//     { id: 5, title: "Google", link: "https://exercice.ui", source: "https://www.google.com", date: "23 March 2022" },
//     { id: 6, title: "Twitch", link: "https://exercice.ui", source: "https://www.twitch.tv", date: "2 August 2022" },
//     { id: 7, title: "Youtube", link: "https://exercice.ui", source: "https://www.youtube.com", date: "19 June 2022" },
//     { id: 8, title: "Google", link: "https://exercice.ui", source: "https://www.google.com", date: "23 March 2022" },
//     { id: 9, title: "Twitch", link: "https://exercice.ui", source: "https://www.twitch.tv", date: "2 August 2022" },
// ]

function HistoryLinkPage() {
  const queryClient = useQueryClient();
  const userId = "649c77d4bb81532d5f46f49b";

  const postQuery = useQuery({
    queryKey: ["getAllLinks", userId],
    queryFn: () => apiGetAllLinks(userId),
  });

  const postMutation = useMutation((params) => apiDeleteShorten(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllLinks", userId]);
      toast.success("Short url successfully deleted", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const mutation = useMutation({
    mutationFn: (params) =>
      apiDeleteShorten(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllLinks", userId]);
      toast.success("Short url successfully deleted", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (error) => {
      toast.warn("Failed to delete short url", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const handleDelete = async (params) => {
    console.log(params);
    mutation.mutate(params);
  };
  
  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>;

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
          {postQuery.data.results.length > 0 ? (
            postQuery.data.results.map((link, i) => (
              <div
                key={i}
                className="bg-light text-dark-2 h-fit w-full max-w-sm px-4 py-3 flex flex-col rounded-md"
              >
                <div className="flex justify-between">
                  <a className="font-semibold text-lg" 
                    href={`${import.meta.env.VITE_BASE_URL}/${link.short}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {link.short}
                  </a>

                  <button
                    title="delete"
                    type="button"
                    className="text-dark-2 text-lg hover:scale-75 ease-in-out duration-150"
                    onClick={() => handleDelete(link._id)}
                  >
                    ✕
                  </button>
                </div>

                <Link to={link.full} className="text-sm underline">
                  {link.full}
                </Link>

                <div className="flex justify-between">
                  <p className="font-light text-xs mt-1.5">{formatDate(link.created_at)}</p>

                  <ButtonLink
                    theme="dark"
                    title="Edit"
                    to={`/url-shortener/edit-link/${link._id}`}
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
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default HistoryLinkPage

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const jakartaTimeZone = "Asia/Jakarta";
  
  const formattedDateTime = date.toLocaleString("en-US", {
    timeZone: jakartaTimeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  return formattedDateTime;
}
