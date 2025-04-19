import { createContext, useEffect, useState } from "react";
import axios from 'axios'; 
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

export const AppContext = createContext(); 


export const AppContextProvider = (props) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userData, setUserData] = useState(false); 
  const [visitersCount, setVisitorsCount] = useState(0); 
  const [conversionCount, setConversionCount] = useState(0); 

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedIn(true); 
        getUserData(); 
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
  const getUsersStats = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/stats'); 

      if (data.success) {
        setVisitorsCount(data.stats.totalVisits);
        setConversionCount(data.stats.totalConversions);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAuthState(); 
    getUsersStats(); 
  },[])
  
  const value = {
    backendUrl, 
    isLoggedIn, setIsLoggedIn, 
    userData, setUserData, 
    getUserData, 
    visitersCount , conversionCount
  }
  return (
    <AppContext.Provider  value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
