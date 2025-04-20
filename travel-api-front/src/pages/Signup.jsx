import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Label from "../components/Label";
import Input from "../components/Input";
import axios from "axios";

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm, ...rest } = signUpData;

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/users/createUsers",
        signUpData,
        { headers: { "Content-Type": "application/json" } }
      );
      setIsSignUp(false);
      setError(null);
      navigate("/");
    } catch (err) {
      console.error("Register Error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
          <form className="form form--signup" onSubmit={handleSubmit}>
            <div className="form__group">
              <Label className="form__label" htmlFor="name">
                First name
              </Label>
              <Input
                className="form__input"
                id="name"
                name="firstName"
                type="text"
                placeholder=""
                value={signUpData.firstName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, firstName: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="form__group">
              <Label className="form__label" htmlFor="name">
                Last name
              </Label>
              <Input
                className="form__input"
                id="name"
                name="lastName"
                type="text"
                placeholder=""
                value={signUpData.lastName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, lastName: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="form__group">
              <Label className="form__label" htmlFor="email">
                Email address
              </Label>
              <Input
                className="form__input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                required={true}
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
                placeholder="••••••••"
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                required={true}
              />
            </div>
            <div className="form__group ma-bt-md">
              <Label className="form__label" htmlFor="passwordConfirm">
                Confirm password
              </Label>
              <Input
                className="form__input"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="••••••••"
                value={signUpData.passwordConfirm}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    passwordConfirm: e.target.value,
                  })
                }
                required={true}
              />
            </div>
            <div className="form__group">
              <Button
                className="btn btn--green"
                label="Sign up"
                type="submit"
              />
            </div>
            {error && <p className="error__msg-small">{error}</p>}
          </form>
        </div>
      </main>
    </>
  );
}

export default Signup;
