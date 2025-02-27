import Tour from "./tour.model.js";

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    console.log(error);
  }
};

export const getOneTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await Tour.findById(tourId).populate(
      "createdBy",
      "firstName lastName"
    );
    if (!tour) return res.status(404).json({ message: "Tour Not Found!" });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createTour = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image,
      createdBy,
    } = req.body;

    const tour = new Tour({
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image,
      createdBy,
    });

    await tour.save();
    res.status(201).json({ message: "Tour created successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tourId = req.params.id;

    const {
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image,
    } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour Not Found!" });

    if (title) {
      tour.title = title;
    }
    if (description) {
      tour.description = description;
    }
    if (location) {
      tour.location = location;
    }
    if (country) {
      tour.country = country;
    }
    if (city) {
      tour.city = city;
    }
    if (price) {
      tour.price = price;
    }
    if (averageRating) {
      tour.averageRating = averageRating;
    }
    if (image) {
      tour.image = image;
    }

    await tour.save();
    res.status(200).json({ message: "Tour updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    await Tour.findByIdAndDelete(tourId);
    res.status(200).json({ message: "Tour deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
