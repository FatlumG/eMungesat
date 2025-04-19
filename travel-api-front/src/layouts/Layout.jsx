import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ headerButtons, children, headerLogOut }) {
  return (
    <>
      <Header headerButtons={headerButtons} headerLogOut={headerLogOut} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
