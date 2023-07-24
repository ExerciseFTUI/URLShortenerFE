import { Link } from "react-router-dom";

import HexaParticles from "../../components/hexagonAnim/HexaParticles";
import { ButtonGoogle } from "../../components/button";

function LoginPage() {
  const login = (e) => {
    // do Google Login
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
  };

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

      <p className="text-center text-sm text-grey-1 mt-4">
        Don't have an account?{" "}
        <Link
          onClick={login}
          to="/account/register"
          className="italic underline underline-offset-4"
        >
          Sign up!
        </Link>
      </p>

      <HexaParticles background="#0D2734" color="#527182" />
    </div>
  );
}

export default LoginPage;
