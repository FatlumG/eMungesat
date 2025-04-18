import React from "react";
import Button from "./Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineFlag } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";

function Card() {
  return (
    <div class="card">
      <div class="card__header">
        <div class="card__picture">
          <div class="card__picture-overlay">&nbsp;</div>
          {/* <img class="card__picture-img" src="/img/tours/tour-2-cover.jpg" alt="The Sea Explorer"> */}
        </div>
        <h3 class="heading-tertirary">
          <span>The Sea Explorer</span>
        </h3>
      </div>
      <div class="card__details">
        <h4 class="card__sub-heading">medium 7-day tour</h4>
        <p class="card__text">
          Exploring the jaw-dropping US east coast by foot and by boat
        </p>
        <div class="card__data">
          <HiOutlineLocationMarker className="card__icon" />
          <span>Miami, USA</span>
        </div>
        <div class="card__data">
          <HiOutlineCalendar className="card__icon" />
          <span>June 2021</span>
        </div>
        <div class="card__data">
          <HiOutlineFlag className="card__icon" />
          <span>4 stops</span>
        </div>
        <div class="card__data">
          <HiOutlineUser className="card__icon" />
          <span>15 people</span>
        </div>
      </div>
      <div class="card__footer">
        <p>
          <span class="card__footer-value">$497</span>
          <span class="card__footer-text">per person</span>
        </p>
        <p class="card__ratings">
          <span class="card__footer-value">4.1</span>
          <span class="card__footer-text">rating (8)</span>
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
