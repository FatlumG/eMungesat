import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Label from "../components/Label";
import Input from "../components/Input";
import api from "../auth/api";
import axios from "axios";

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);
  // const [signUpData, setSignUpData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { password, passwordConfirm, ...rest } = signUpData;

  //   if (password !== passwordConfirm) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   console.log(signUpData.firstName, "fname");
  //   console.log(signUpData.lastName, "lastName");
  //   console.log(signUpData.email, "email");
  //   console.log(signUpData.password, "password");
  //   console.log(signUpData.passwordConfirm, "passwordConfirm");
  //   console.log(handleSubmit);

  //   try {
  //     await axios.post(
  //       "http://localhost:3000/api/v1/users/createUsers",
  //       { signUpData },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  //     setIsSignUp(false);
  //     setError(null);
  //     navigate("/login");
  //   } catch (err) {
  //     console.error("Register Error:", err.message);
  //     setError("Something went wrong. Please try again.");
  //     // console.error("Register Error:", err.response?.data || err.message);
  //     // setError(err.response?.data?.message || "Something went wrong. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Add this log to see if it's being called

    // const { password, passwordConfirm, ...rest } = signUpData;

    // if (password !== passwordConfirm) {
    //   setError("Passwords do not match.");
    //   return;
    // }

    // console.log(signUpData.firstName, "fname");
    // console.log(signUpData.lastName, "lastName");
    // console.log(signUpData.email, "email");
    // console.log(signUpData.password, "password");
    // console.log(signUpData.passwordConfirm, "passwordConfirm");

    try {
      await axios.post(
        "http://localhost:3000/api/v1/users/createUsers",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setIsSignUp(false);
      setError(null);
      navigate("/login");
    } catch (err) {
      console.error("Register Error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Header />
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
                name="name"
                type="text"
                placeholder=""
                value={firstName}
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
                name="name"
                type="text"
                placeholder=""
                value={lastName}
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
                value={email}
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
                value={password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                required={true}
                minLength="8"
              />
            </div>
            {/* <div className="form__group ma-bt-md">
              <Label className="form__label" htmlFor="passwordConfirm">
                Confirm password
              </Label>
              <Input
                className="form__input"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="••••••••"
                value={passwordConfirm}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    passwordConfirm: e.target.value,
                  })
                }
                required="true"
                minLength="8"
              />
            </div> */}
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
      <Footer />
    </>
  );
}

export default Signup;
