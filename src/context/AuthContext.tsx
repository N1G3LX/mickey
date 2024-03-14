'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthContextType);

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedIsAuthenticated = localStorage?.getItem('isAuthenticated');
      return storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false;
    }
    return false; // Default value if localStorage is not available
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage?.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
