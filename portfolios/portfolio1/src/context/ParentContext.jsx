import { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = useCallback((newUserData) => {
    console.log('AppContext - Updating user with:', newUserData);
    if (!newUserData) {
      console.warn('Attempted to set user data to null or undefined');
      return;
    }
    setUser(newUserData);
  }, []);

  const value = {
    user,
    setUser: updateUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;