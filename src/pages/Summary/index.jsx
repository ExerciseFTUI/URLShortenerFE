import { useState } from "react"
import { Link } from "react-router-dom"
import { QRCode } from "react-qrcode-logo"

import HexaParticles from "../../components/hexagonAnim/HexaParticles"

import logo from "../../assets/exe-logo-with-bg.png"

const SummaryPage = () => {
  const [link, setLink] = useState("")
  const queryClient = useQueryClient();

  //Get user data
  const userQuery = useQuery({
    queryKey: ["getUserData"],
    queryFn: () => apiGetUserData(),
  });

  //User Data
  const user = userQuery.data?.user;

  //After that get user qr codes
  const qrQuery = useQuery({
    queryKey: ["getQrByUser", userQuery.data?.user._id],
    queryFn: () => apiGetQr(userQuery.data?.user._id),
    enabled: !!userQuery.data,
  });

  //User Qr Codes
  const userQr = qrQuery.data?.payload;

  function shortenLink(e) {
    if (link.length == 0) {
      e.preventDefault()
      return
    }
  };

  // DO URL Shortening
};

  if (userQuery.isSuccess) {
    // sessionStorage.setItem("userId", userQuery.data.user._id);
    // sessionStorage.setItem("name", userQuery.data.user.name);
  }

  return (
    <div id="summary-page" className="">
      <div
        id="summary-header"
        className="relative w-full px-6 pt-28 pb-36 shadow-grey-2 shadow-lg rounded-b-[30%] overflow-hidden"
      >
        <h1 className="font-bold text-center text-5xl md:text-7xl">
          Welcome to <br /> <i>ex.tech</i>
        </h1>

        <HexaParticles
          background="#0D2734"
          color="#FAFAFA"
          angle="90"
          fullscreen={false}
          className="absolute top-0 left-0 z-[-1] w-full h-full"
        />
      </div>

      <div
        id="summary-shortener"
        className="bg-dark px-6 pt-20 pb-16 flex flex-col items-center gap-8 w-full"
      >
        <h1 className="font-semibold text-2xl md:text-3xl text-center">
          Tired of the needs to type a <br /> <i>very, very,</i> long link?
        </h1>

        <p className="bg-light font-bold text-dark text-2xl md:text-3xl text-center w-fit px-2 py-1">
          Try our URL Shortener feature!
        </p>

        <form className="flex w-full max-w-xl" onSubmit={shortenLink}>
          <input
            type="text"
            name="summary-url-shortener-input"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="bg-light text-dark outline-none rounded-l-lg w-full h-24 pl-6"
          />

          <button
            type="submit"
            name="submit-summary-shortener"
            title="submit-summary-shortener"
            className="btn-light text-dark border-dark border-l-2 rounded-r-lg text-lg md:whitespace-nowrap md:px-3 md:text-xl"
          >
            Get URL
          </button>
        </form>
      </div>

      <div
        id="summary-qr"
        className="bg-light text-dark-1 text-center px-6 py-24 mt-16 rounded-t-full flex flex-col items-center gap-4"
      >
        <h1 className="font-extrabold text-3xl lg:text-4xl">
          Not interested in <br /> <i>URL Shortener</i>?
        </h1>

        <p className="bg-dark-1 font-bold text-light text-3xl px-2 py-1 lg:text-4xl">
          Try Our QR Code
        </p>

        <p className="font-medium text-xl lg:text-2xl">
          Convert your link into a QR Code!
        </p>

        <QRCode
          value="https://www.ex.tech/"
          ecLevel="H"
          enableCORS
          size={196}
          logoImage={logo}
          logoPadding={2}
          fgColor="#1C465C"
          removeQrCodeBehindLogo
          id="landing-qr-code"
        />

        <Link to="/qr-codes/default" className="btn-dark text-xl lg:text-2xl">
          Get Here
        </Link>
      </div>
    </div>
    
  )
}

export default SummaryPage
