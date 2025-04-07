import { createContext, useState, useEffect, useContext, useMemo } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { BaseUrlApi, ErrorMessage } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const userToken = Cookie.get("token");
  //   if (userToken) {
  //     const getProfile = async () => {
  //       try {
  //         setLoading(true);
  //         const { data } = await axios.get(`${BaseUrlApi}/me`);
  //         setUser(data);
  //       } catch (error) {
  //         Cookie.remove("token");
  //         setUser(null);
  //         navigate("/login");
  //         toast("Error", {
  //           description: ErrorMessage(error),
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     getProfile();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [navigate]);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      Cookie.set("token", urlToken, { expires: 1 });
    }
  }, []);

  // Logout function
  const logout = () => {
    setUser(null);
    Cookie.remove("token");
    navigate("/login");
  };

  const { changeLanguage } = useLanguage();

  // Send Timezone
  // useMemo(() => {
  //   console.log("callBack Timezone");
  //   axios.get("https://ipinfo.io/json").then(({ data }) => {
  //     if (!!data) {
  //       axios
  //         .post(`${BaseUrlApi}/timezone/${data.country}`)
  //         .then(({ data }) => {
  //           const isLangExist = Cookie.get("language");
  //           if (!isLangExist) changeLanguage(data.trim());
  //         })
  //         .catch((error) => {
  //           toast("Error", {
  //             description: ErrorMessage(error),
  //           });
  //         });
  //     }
  //   });
  // }, [changeLanguage]);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
