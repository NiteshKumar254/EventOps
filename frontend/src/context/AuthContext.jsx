// // import { createContext, useState, useEffect } from "react";
// // import axios from "../services/api";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(
// //     JSON.parse(localStorage.getItem("user")) || null
// //   );

// //   const login = async (email, password) => {
// //     const res = await axios.post("/auth/login", { email, password });
// //     setUser(res.data);
// //     localStorage.setItem("user", JSON.stringify(res.data));
// //     return res.data;
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem("user");
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
// import { createContext, useState, useEffect } from "react";
// import axios from "../services/api";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   // ✅ Signup function (calls your backend /auth/register)
//   const signup = async (name, email, password) => {
//     const res = await axios.post("/auth/register", { name, email, password });
//     return res.data;
//   };

//   // ✅ Login function (calls backend /auth/login)
//   const login = async (email, password) => {
//     const res = await axios.post("/auth/login", { email, password });
//     setUser(res.data);
//     localStorage.setItem("user", JSON.stringify(res.data));
//     return res.data;
//   };

//   // ✅ Logout
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import axios from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ For smoother route rendering

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Signup
  const signup = async (name, email, password) => {
    const res = await axios.post("/auth/register", { name, email, password });
    return res.data;
  };

  // ✅ Login
  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
