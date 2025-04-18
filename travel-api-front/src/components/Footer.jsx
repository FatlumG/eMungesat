import React from "react";
import { Link as ScrollLink } from "react-scroll";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        {/* <img src="/img/logo-green.png" alt="Natour logo"> */}
      </div>
      <ul className="footer__nav">
        <li>
          <ScrollLink to="header" smooth={true} duration={750} offset={-50}>
            About us
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="header" smooth={true} duration={750} offset={-50}>
            Download apps
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="header" smooth={true} duration={750} offset={-50}>
            Become a guide
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="header" smooth={true} duration={750} offset={-50}>
            Careers
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="header" smooth={true} duration={750} offset={-50}>
            Contact
          </ScrollLink>
        </li>
      </ul>
      <p className="footer__copyright">© 2025 by TechLab.</p>
    </footer>
  );
}

export default Footer;
