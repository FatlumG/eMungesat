import React, { useState } from "react";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";

function AddTourModal({ onSuccess, onClose }) {
  const [tour, setTour] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    date: "",
    price: "",
    duration: "",
    startingDate: "",
    stops: "",
    averageRating: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const addTour = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", tour.title);
    data.append("description", tour.description);
    data.append("location", tour.location);
    data.append("capacity", tour.capacity);
    data.append("date", tour.date);
    data.append("price", tour.price);
    data.append("duration", tour.duration);
    data.append("stops", tour.stops);
    data.append("startingDate", tour.startingDate);
    data.append("averageReating", tour.averageRating);
    data.append("image", image);

    try {
      setLoading(true);
      axios.post("http://localhost:3000/api/v1/tours", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding tour:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-tour">
      <h1>Add New Tour</h1>
      <div className="tour--inputs">
        <Input
          type="text"
          placeholder="Title"
          value={tour.title}
          onChange={(e) => setTour({ ...tour, title: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Description"
          value={tour.description}
          onChange={(e) => setTour({ ...tour, description: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Location"
          value={tour.location}
          onChange={(e) => setTour({ ...tour, location: e.target.value })}
        />
        <div className="tour--inputs--two">
          <Input
            type="number"
            placeholder="Capacity"
            value={tour.capacity}
            onChange={(e) => setTour({ ...tour, capacity: e.target.value })}
            min={1}
          />
          <Input
            type="date"
            placeholder="Starting Date"
            value={tour.startingDate}
            onChange={(e) => setTour({ ...tour, startingDate: e.target.value })}
          />
        </div>
        <div className="tour--inputs--two">
          <Input
            type="number"
            placeholder="Price"
            value={tour.price}
            onChange={(e) => setTour({ ...tour, price: e.target.value })}
            min={0}
          />
          <Input
            type="number"
            placeholder="Duration"
            value={tour.duration}
            onChange={(e) => setTour({ ...tour, duration: e.target.value })}
            min={1}
          />
        </div>
        <div className="tour--inputs--two">
          <Input
            type="number"
            placeholder="Average Rating"
            value={tour.averageRating}
            onChange={(e) =>
              setTour({ ...tour, averageRating: e.target.value })
            }
            step={0.1}
            min={1}
            max={5}
          />
          <Input
            type="number"
            placeholder="Stops"
            value={tour.stops}
            onChange={(e) => setTour({ ...tour, stops: e.target.value })}
            min={1}
          />
        </div>
        <Input
          type="file"
          accept="image/*"
          placeholder="Image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button
          className="btn btn--green"
          label={`${loading ? "Adding..." : "Add Tour"}`}
          onClick={addTour}
        />
      </div>
    </div>
  );
}

export default AddTourModal;
