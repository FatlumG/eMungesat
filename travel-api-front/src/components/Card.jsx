import React, { useState } from "react";
import Button from "./Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineFlag } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";

function Card({ tour }) {
  const {
    title,
    description,
    location,
    capacity,
    startingDate,
    price,
    stops,
    duration,
    averageRating,
    ratings,
    image,
  } = tour;

  const fullImageUrl = image?.startsWith("uploads")
    ? `http://localhost:3000/${image}`
    : image || "https://via.placeholder.com/300x200?text=No+Image";

  // const handleBookingSuccess = () => {
  //   console.log("Booking successful!");
  // };

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            className="card__picture-img"
            src={fullImageUrl}
            alt="The Sea Explorer"
          />
        </div>
        <h3 className="heading-tertirary">
          <span>{title}</span>
        </h3>
      </div>
      <div className="card__details">
        <h4 className="card__sub-heading">
          {duration < 5 ? "Easy" : "Medium"} {duration}-day tour
        </h4>
        <p className="card__text">{description}</p>
        <div className="card__data">
          <HiOutlineLocationMarker className="card__icon" />
          <span>{location}</span>
        </div>
        <div className="card__data">
          <HiOutlineCalendar className="card__icon" />
          <span>{startingDate.split("T")[0]}</span>
        </div>
        <div className="card__data">
          <HiOutlineFlag className="card__icon" />
          <span>{stops} stops</span>
        </div>
        <div className="card__data">
          <HiOutlineUser className="card__icon" />
          <span>{capacity} people</span>
        </div>
      </div>
      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price} </span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{averageRating} </span>
          <span className="card__footer-text">rating</span>
        </p>
        <Button
          label="Details"
          className="btn btn--green btn--small"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default Card;
