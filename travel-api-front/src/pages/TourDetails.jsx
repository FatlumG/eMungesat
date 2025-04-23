import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { BsStarFill } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import Button from "../components/Button";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/tours/${id}`
        );

        const tourData = response.data;

        if (tourData) {
          setTour(tourData);
          setLoading(false);
        } else {
          setError("Tour data structure is invalid");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching tour:", err);
        setError("Failed to load tour details");
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  const handleBookNow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/v1/bookings/${tour._id}/book`,
        { tourId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //Redirect to Stripe Checkout if session URL is available
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("Booking failed:", err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!tour) return <div className="not-found">Tour not found</div>;

  const fullImageUrl = tour.image?.startsWith("uploads")
    ? `http://localhost:3000/${tour.image}`
    : tour.image || "https://via.placeholder.com/1200x800?text=No+Image";

  const formatTitle = () => {
    const title = tour.title || "Sea Explorer Tour";
    const words = title.split(" ");

    if (words.length === 3) {
      return {
        firstPart: words[0],
        secondPart: words[1],
        thirdPart: words[2],
      };
    }

    if (words.length === 2) {
      return {
        firstPart: words[0],
        secondPart: words[1],
        thirdPart: "TOUR",
      };
    }

    const midpoint = Math.ceil(words.length / 3);
    return {
      firstPart: words.slice(0, midpoint).join(" "),
      secondPart: words.slice(midpoint, midpoint * 2).join(" "),
      thirdPart: words.slice(midpoint * 2).join(" ") || "TOUR",
    };
  };

  const { firstPart, secondPart, thirdPart } = formatTitle();

  return (
    <div className="tour-details">
      <div className="tour-header">
        <img
          src={fullImageUrl}
          alt="Image"
          className="tourdetails-background-image"
        />
        <div className="overlay"></div>
        <div className="title-container">
          <div className="tour-title-box">
            <h1 className="tour-title">{firstPart.toUpperCase()}</h1>
          </div>
          <div className="tour-subtitle-box">
            <h2 className="tour-subtitle">{secondPart.toUpperCase()}</h2>
          </div>
          <div className="tour-subtitle-box">
            <h2 className="tour-subtitle">{thirdPart.toUpperCase()}</h2>
          </div>
        </div>
        <div className="tour-info">
          <div className="tour-info-item">
            <IoTimeOutline className="icon" />
            <span>{tour.duration || 7} DAYS</span>
          </div>
          <div className="tour-info-item">
            <HiOutlineLocationMarker className="icon" />
            <span>{tour.location || "MIAMI, USA"}</span>
          </div>
        </div>
      </div>

      <div className="tour-details-content">
        <div className="tour-details-left">
          <h2 className="section-title">QUICK FACTS</h2>
          <div className="tour-fact">
            <HiOutlineCalendar className="fact-icon" />
            <div>
              <div className="fact-label">NEXT DATE</div>
              <div className="fact-value">June 2021</div>
            </div>
          </div>
          <div className="tour-fact">
            <IoBarChartSharp className="fact-icon" />
            <div>
              <div className="fact-label">DIFFICULTY</div>
              <div className="fact-value">
                {tour.duration < 5
                  ? "Easy"
                  : tour.duration < 8
                  ? "Medium"
                  : "Hard"}
              </div>
            </div>
          </div>
          <div className="tour-fact">
            <MdOutlinePeopleAlt className="fact-icon" />
            <div>
              <div className="fact-label">Capacity</div>
              <div className="fact-value">{tour.capacity} People</div>
            </div>
          </div>
          <div className="tour-fact">
            <BsStarFill className="fact-icon" />
            <div>
              <div className="fact-label">RATING</div>
              <div className="fact-value">{tour.averageRating} / 5</div>
            </div>
          </div>
        </div>

        <div className="tour-details-right">
          <h2 className="section-title">
            ABOUT {tour.title?.toUpperCase() || "THE TOUR"}
          </h2>
          <p className="tour-description">{tour.description}</p>
          <p className="tour-description">
            Embark on a journey designed to awaken your sense of adventure and
            curiosity. This guided tour offers the perfect blend of relaxation,
            exploration, and cultural immersion. Whether you're strolling
            through historic streets, enjoying breathtaking natural landscapes,
            or tasting authentic local cuisine, every moment is crafted to
            create lasting memories. Ideal for solo travelers, couples,
            families, or friends, this experience brings people together through
            shared discovery and unforgettable moments. No matter the
            destination, this tour promises an enriching escape from the
            everyday.
          </p>
        </div>
      </div>

      {/* Call to action section */}
      <div className="tour-cta-container">
        <div className="tour-cta">
          <div className="cta-logo">
            <div className="cta-logo-circle">
              <FaRegCompass className="cta-logo-icon" />
            </div>
          </div>
          <div className="cta-content">
            <h2 className="cta-title">WHAT ARE YOU WAITING FOR?</h2>
            <p className="cta-text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
          </div>
          <button
            className="cta-button"
            onClick={() => {
              isLogged ? handleBookNow() : navigate("/login");
            }}
          >
            {isLogged ? "Book Now" : "Login to Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
