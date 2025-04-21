import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tours from "./pages/Tours";
import Signup from "./pages/Signup";
import TourDetails from "./pages/TourDetails";
import Layout from "./layouts/Layout";
// import AuthProvider from "./context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  useEffect(() => {
    const checkToken = () => {
      setLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <Router>
      <Layout headerButtons={!loggedIn} headerLogOut={handleLogout}>
        <Routes>
          <Route
            path="/"
            element={<Login onLogin={() => setLoggedIn(true)} />}
          />
          <Route path="/signup" element={<Signup />} />
          {loggedIn && <Route path="/tours" element={<Tours />} />}
          <Route path="/tour/:id" element={<TourDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
