import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import '../styles/App.css';

function Tours() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="card-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Tours;
