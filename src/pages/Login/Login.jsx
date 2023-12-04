import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login, setToken } from "../../utilities/auth";
import { toast } from "react-toastify";

const Login = () => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setToken(response.access);
      toast.success("Vous vous êtes connecté avec succés");
      navigateTo("/dashboard");
    } catch (error) {
      toast.error("Un problème est survenue, Vérifier vos identifiants");
      console.error("Login failed", error);
    }
  };
  return (
    <div className=" bg-gray-900 h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 w-[600px] max-w-full">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold  text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Tickety
        </Link>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
              Connectez-vous à votre compte Tickety
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Votre Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="AssistantFr15"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Votre mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
