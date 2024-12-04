import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token has expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUserRole(null);
        } else {
          setIsAuthenticated(true);
          setUserRole(decodedToken.role);
        }
      } catch (error) {
        console.error('Error during token verification:', error.message);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUserRole(role);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;