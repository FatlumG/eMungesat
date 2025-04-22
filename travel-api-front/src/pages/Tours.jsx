import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import AddTourModal from "../components/AddTourModal";
import Input from "../components/Input";

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


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };
  return (
    <>
      <main className="main">
        <h1 className="main__title">All tours</h1>
        <div className="filters">
          <Input
            type="text"
            name="title"
            placeholder="Search by title"
            value={filters.title}
            onChange={handleFilterChange}
            className="filters__filter"
          />
          <Input
            type="text"
            name="location"
            placeholder="Search by location"
            value={filters.location}
            onChange={handleFilterChange}
            className="filters__filter"
          />
          <Input
            type="number"
            name="rating"
            placeholder="Minimum rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="filters__filter"
            min={1}
            max={5}
          />
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="filters__filter"
          >
            <option value="">Sort by...</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="averageRating">Rating: Low to High</option>
            <option value="-averageRating">Rating: High to Low</option>
          </select>
          <button
            className="filters__filter btn btn--green"
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => setShowModal(!showModal)}
          >
            Add Tour +
          </button>
        </div>
        <div className="card-container">
          {Array.isArray(tours) && tours.length > 0 ? (
            tours.map((tour) => <Card key={tour._id || tour.id} tour={tour} />)
          ) : (
            <div>No tours available</div>
          )}

        
        </div>

        {showModal && (
          <AddTourModal
            onClose={() => setShowModal(false)}
            onSuccess={fetchTours}
          />
        )}
      </main>
    </>
  );
}

export default Tours;
