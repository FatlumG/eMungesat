import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tours from "./pages/Tours";
import Signup from "./pages/Signup";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tours" element={<Tours />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
