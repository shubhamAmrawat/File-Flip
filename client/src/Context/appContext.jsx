import { createContext, useEffect, useState } from "react";
import axios from 'axios'; 
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

export const AppContext = createContext(); 


export const AppContextProvider = (props) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userData, setUserData] = useState(false); 

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedIn(true); 
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/getUsersData");

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState(); 
  },[])
  
  const value = {
    backendUrl, 
    isLoggedIn, setIsLoggedIn, 
    userData, setUserData, 
    getUserData
  }
  return (
    <AppContext.Provider  value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
