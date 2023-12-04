import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getToken } from "../utilities/auth";
import { toast } from "react-toastify";
import NotificationsModal from "../pages/Dashboard/modals/NotificationsModal";
const Navbar = () => {
  const navigateTo = useNavigate();
  const [toggle, setToggle] = useState(false);
  const token = getToken();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Vous êtes déconnecté");
    navigateTo("/login");
  };
  const toggleMobileBar = () => {
    setToggle((prev) => !prev);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Tickety
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
            <div className="hidden items-center gap-2 md:flex">
              <NotificationsModal />
              <Link
                to="/dashboard"
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 hover:text-green-200 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center "
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-700 hover:bg-red-800 hover:text-red-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center "
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/login"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 hover:text-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
              >
                Se connecter
              </Link>
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMobileBar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {toggle && (
          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <div className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <NotificationsModal />
              <a
                to="/dashboard"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-center"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
