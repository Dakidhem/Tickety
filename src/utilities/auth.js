import axios from "axios";
import { jwtDecode } from "jwt-decode";

const login = async (username, password) => {
  const response = await axios.post(
    "https://tickety-api-dakidhem.vercel.app/api/auth/token/",
    {
      username,
      password,
    }
  );
  return response.data;
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const getUserRole = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      return userRole;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  return null; // Return null if no token is found
};
export { login, setToken, getToken, getUserRole };
