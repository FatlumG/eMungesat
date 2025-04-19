import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

function Tours() {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/tours");
      setTours(res.data.data.tours);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  console.log(tours, "tours");
  

  useEffect(() => {
    fetchTours();
  }, []);
  

  return (
    <>
      <main className="main">
        <div className="card-container">
          {Array.isArray(tours) &&
            tours.map((tour) => <Card key={tour._id} tour={tour} />)}
          {/* <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card /> */}
        </div>
      </main>
    </>
  );
}

export default Tours;
