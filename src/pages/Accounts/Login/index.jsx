import { useLocation, useNavigate } from "react-router";
import { ButtonGoogle } from "../../../components/button";
import HexaParticles from "../../../components/hexagonAnim/HexaParticles";

function LoginPage() {
  const location = useLocation();
  // const from = location.state?.from || "/";
  // const navigate = useNavigate();

  function login() {
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
    // sessionStorage.setItem("name", "da");
    // navigate(from, { replace: true });
  }

  if (sessionStorage.getItem("error")) {
    alert(sessionStorage.getItem("error"));
    sessionStorage.removeItem("error");
  }

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
