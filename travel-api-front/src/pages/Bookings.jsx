import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import axios from "axios";
import { Link } from "react-router-dom";

function Bookings() {
  const [tours, setTours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    rating: "",
    sort: "",
    page: 1,
    limit: 6,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });

  const fetchBookings = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/v1/bookings/myBookings?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data, "res.data");
      res.data.map((booking) => {
        console.log(booking.status);
      });

      setTours(res.data);
      setPagination({
        currentPage: res.data.page,
        totalPages: Math.ceil(res.data.totalResults / filters.limit),
        totalResults: res.data.totalResults,
      });
    } catch (error) {
      console.error("Error fetching Bookings", error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filters]);

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
        <h1 className="main__title">My Bookings</h1>
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
          <Link
            className="filters__filter btn btn--green"
            style={{
              color: "white",
              cursor: "pointer",
              textAlign: "center",
              padding: "10px",
            }}
            to="/tours"
          >
            Book a tour +
          </Link>
        </div>
        <div className="card-container">
          {Array.isArray(tours) &&
            tours.map((tour) => (
              <Card
                key={tour._id}
                tour={{ ...tour.tour, status: tour.status }}
                onBook={true}
              />
            ))}
        </div>
        {/* <div className="pagination">
          <button
            className="pagination__btn"
            onClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
          >
            1
          </button>
          <button
            className="pagination__btn"
            onClick={() => setFilters((prev) => ({ ...prev, page: 2 }))}
          >
            2
          </button>
          <button
            className="pagination__btn"
            onClick={() => setFilters((prev) => ({ ...prev, page: 3 }))}
          >
            3
          </button>
        </div> */}

        {showModal && (
          <AddTourModal
            onClose={() => setShowModal(false)}
            // onSuccess={fetchTours}
          />
        )}
      </main>
    </>
  );
}

export default Bookings;
