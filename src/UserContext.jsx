import React, { createContext, useContext, useState, useEffect } from 'react';


const USER_INFO_KEY = 'user_info';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  
  const storedUserInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY)) || {
    fullName: '',
    userImage: '',

  };

  const [userInfo, setUserInfo] = useState(storedUserInfo);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(userInfo.userId && userInfo.token));

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(newUserInfo));
  };



  useEffect(() => {
    setIsAuthenticated(Boolean(userInfo.userId && userInfo.token));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo, isAuthenticated}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
