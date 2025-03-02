// import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    console.warn("No token found. Redirecting to login...");
    window.location.href = "/login"; // Redirect if no token
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers, // Merge with any additional headers
  };

  try {
    const response = await fetch(`${API_URL}${url}`, { ...options, headers });

    // If session expired (401 Unauthorized), redirect to login
    if (response.status === 401 || response.status === 403) {
      console.warn("Session expired. Redirecting to login...");
      localStorage.removeItem("userToken");
      window.location.href = "/login"; // Redirect user to login page
      return;
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
};

export default fetchWithAuth;


// const API_URL = import.meta.env.VITE_API_URL;

// const fetchWithAuth = async (url, options = {}) => {
//   const token = localStorage.getItem("userToken");

//   const headers = {
//     "Content-Type": "application/json",
//     ...options.headers,
//     Authorization: token ? `Bearer ${token}` : "",
//   };

//   const response = await fetch(`${API_URL}${url}`, { ...options, headers });

//   if (response.status === 401) {
//     console.warn("Session expired. Redirecting to login...");
//     localStorage.removeItem("userToken");

//     // Use React Router navigation dynamically
//     const navigate = useNavigate();
//     navigate("/login");

//     return null; // Prevent further execution
//   }

//   return response;
// };

// export default fetchWithAuth;
