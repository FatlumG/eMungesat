import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/tours");
      console.log("API Response:", res.data);
      
      // Handle different API response structures
      let toursData = [];
      if (res.data.data && res.data.data.tours) {
        toursData = res.data.data.tours;
      } else if (res.data.tours) {
        toursData = res.data.tours;
      } else if (res.data.data && Array.isArray(res.data.data)) {
        toursData = res.data.data;
      } else if (Array.isArray(res.data)) {
        toursData = res.data;
      }
      
      console.log("Processed tours data:", toursData);
      setTours(toursData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tours:", error);
      setError("Failed to load tours");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <main className="main">
        <div className="card-container">
          {Array.isArray(tours) && tours.length > 0 ? (
            tours.map((tour) => <Card key={tour._id || tour.id} tour={tour} />)
          ) : (
            <div>No tours available</div>
          )}
        </div>
      </main>
    </>
  );
}

export default Tours;
