import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("userToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(`${API_URL}${url}`, { ...options, headers });

  if (response.status === 401) {
    console.warn("Session expired. Redirecting to login...");
    localStorage.removeItem("userToken");

    // Use React Router navigation dynamically
    const navigate = useNavigate();
    navigate("/login");

    return null; // Prevent further execution
  }

  return response;
};

export default fetchWithAuth;
