<<<<<<< HEAD:src/pages/Login/index.jsx
import { Link } from "react-router-dom";

import HexaParticles from "../../components/hexagonAnim/HexaParticles";
import { ButtonGoogle } from "../../components/button";

function LoginPage() {
  const login = (e) => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonGoogle } from "../../../components/button";
import HexaParticles from "../../../components/hexagonAnim/HexaParticles";

function LoginPage() {
  const [firstTime, setFirstTime] = useState(false);

  function login() {
    // Send request for Google Login
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
    if (firstTime) {
      useNavigate("/account/fill-data");
    }
  }
>>>>>>> bb9fe9638d4a0e3213f6fdfa2301fcb99781bbd7:src/pages/Accounts/Login/index.jsx

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

      <ButtonGoogle theme="light" title="Sign In With Google" onClick={login} />

      <HexaParticles background="#0D2734" color="#527182" />
    </div>
  );
}

export default LoginPage;
