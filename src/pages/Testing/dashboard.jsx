import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPostShorten, apiGetAllLinks } from "./api/posts";

const isValidUrl = urlString => {
  let url;
  try { 
        url =new URL(urlString); 
    }
    catch(e){ 
      return false; 
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function dashboard() {
  const queryClient = useQueryClient();
  const userId = "6463a6fb3827257e7420ca1d";

  const shortURL = {
    user_id: userId,
    full_url: "",
    short_url: "",
  }

  const postQuery = useQuery({
    queryKey: ["getAll", userId],
    queryFn: () => apiGetAllLinks(userId),
  });

  const postMutation = useMutation((params) => apiPostShorten(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAll', userId]);
    },
  });

  const handlePost = async () => {
    if (isValidUrl(shortURL.full_url)) {
      console.log(shortURL);
    }else {
      alert("Invalid URL");
      return
    }
    try {
      await postMutation.mutateAsync(shortURL);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>;

  if (postMutation.isLoading) return <h1>Loading...</h1>;
  if (postMutation.isError) return <h1>{JSON.stringify(postMutation.error)}</h1>;
  return (
    <>
      <div className="mx-20">
        <h1 className="mt-24 mb-8 text-center text-3xl">URL Shortener</h1>
        <div className="flex flex-col items-center">
          <h1 className="w-full max-w-xs my-4"> CREATE NEW SHORT URL</h1>
          <div className="form-control w-full max-w-xs mb-8 text-black">
            <label className="label">
              <span className="label-text">Enter Full URL</span>
            </label>
            <input
              type="text"
              name="full_url"
              placeholder="Type here"
              onChange={(e) => (shortURL.full_url = e.target.value)}
              className="input input-bordered w-full max-w-xs rounded-xl pl-2 text-[#000000] h-10"
            />
          </div>
          <div className="form-control w-full max-w-xs mb-8 text-black">
            <label className="label">
              <span className="label-text">Enter Short URL</span>
            </label>
            <input
              type="text"
              name="short_url"
              placeholder="Type here"
              onChange={(e) => (shortURL.short_url = e.target.value)}
              className="input input-bordered w-full max-w-xs rounded-xl pl-2 text-[#000000] h-10"
            />
          </div>
          <button className="btn bg-grey rounded-3xl h-10 w-20 mb-8 hover:bg-grey-2" onClick={handlePost}>Submit</button>
          <div className="overflow-x-auto bg-grey-1 rounded-3xl p-4">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>user id</th>
                  <th>full</th>
                  <th>clicks</th>
                  <th>links</th>
                </tr>
              </thead>
              <tbody>
                {postQuery.data.results.length > 0 ? (
                  postQuery.data.results.map((item, index) => (
                    <tr key={index}>
                      <th>{item.user_id}</th>
                      <td>{item.full}</td>
                      <td>{item.clicks}</td>
                      <a
                        href={`${import.meta.env.VITE_BASE_URL}/${item.short}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <td>{item.short}</td>
                      </a>
                    </tr>
                  ))
                ) : (
                  <h1>No Data</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default dashboard;
