import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../auth/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Label from "../components/Label";
import Input from "../components/Input";

const Login = ({ onLogin }) => {
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", logInData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      if (onLogin) onLogin(); // let App know
      navigate("/tours");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleChangeLogIn = (e) => {
    const { name, value } = e.target;
    setLogInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {/* <Header /> */}
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">
            {"Log into your account"}
          </h2>
          <form className="form form--login" onSubmit={handleLogIn}>
            <div className="form__group">
              <Label className="form__label" htmlFor="email">
                Email address
              </Label>
              <Input
                className="form__input"
                id="email"
                name="email"
                type="email"
                value={logInData.email}
                onChange={handleChangeLogIn}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form__group ma-bt-md">
              <Label className="form__label" htmlFor="password">
                Password
              </Label>
              <Input
                className="form__input"
                id="password"
                name="password"
                type="password"
                value={logInData.password}
                onChange={handleChangeLogIn}
                placeholder="••••••••"
                required
                minLength="8"
              />
            </div>
            <div className="form__group">
              <Button className="btn btn--green" label={"Login"} />
            </div>
          </form>
          {error && <p className="error__msg-small">{error}</p>}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
