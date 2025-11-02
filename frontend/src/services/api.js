// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach JWT token automatically
// instance.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user?.token) {
//     config.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return config;
// });

// export default instance;

//today
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

//Automatically attach JWT token
instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

//Handle expired or invalid tokens globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;

    if (error.response?.status === 401) {
      if (message === "Token expired") {
        console.warn("⏰ Session expired. Redirecting to login...");
        alert("Your session has expired. Please log in again.");
      } else if (message === "Not authorized, invalid token") {
        console.warn("⚠️ Invalid token detected. Redirecting to login...");
      }

      //Clear user data and redirect
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
