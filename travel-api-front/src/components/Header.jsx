import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header({ headerButtons, headerLogOut }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const yourToken = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${yourToken}`,
          },
        });

        if (res.data) {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
        } else {
          console.error("User data not found in response.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const FLName = firstName.charAt(0) + lastName.charAt(0);

  return (
    <header className="header" id="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to="/tours">
          All tours
        </Link>
      </nav>
      <div className="header__logo">
        {/* <img src="/img/logo-white.png" alt="Natours logo"> */}
      </div>
      <nav className="nav nav--user">
        {headerButtons ? (
          <>
            <Link className="nav__el" to="/">
              Log in
            </Link>
            <Link className="nav__el nav__el--cta" to="/signup">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <Link className="nav__el" to="/" onClick={headerLogOut}>
              Log out
            </Link>
            <Link className="nav__el" to="/profile">
              <div className="pfp">{FLName}</div>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
