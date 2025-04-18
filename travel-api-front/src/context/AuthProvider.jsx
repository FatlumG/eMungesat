import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return false;
      }
      const { token, user } = data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const fetchCurrentUser = async () => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const res = await getUser(userId);
      if (res.data && res.data.data && res.data.data.user) {
        setUser(res.data.data.user);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    if (token && !user) {
      fetchCurrentUser();
    }
  }, [token, user]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
