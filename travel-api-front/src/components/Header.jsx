import React from "react";
import { Link } from "react-router-dom";

function Header({ headerButtons,headerLogOut }) {
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
          <Link className="nav__el" to="/" onClick={headerLogOut}>
            Log out
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
