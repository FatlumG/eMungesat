import React from "react";
import Header from "./components/Header";

function Layout() {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
