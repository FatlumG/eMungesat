import Tour from "./tour.model.js";

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
      .populate("createdBy", "firstName lastName")
      .populate("reviews.user", "firstName lastName")
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
      createdBy,
    } = req.body;

    const image = req.file ? req.file.path : null;

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
    } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour Not Found!" });

    if (title) tour.title = title;
    if (description) tour.description = description;
    if (location) tour.location = location;
    if (country) tour.country = country;
    if (city) tour.city = city;
    if (price) tour.price = price;
    if (averageRating) tour.averageRating = averageRating;
    const image = req.file ? req.file.path : null;
    tour.image = image;
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

// export const addReview = async (req, res) => {
//   try {
//     const tourId = req.params.tourId;

//     const tour = await Tour.findById(tourId);

//     if (!tourId) return res.status(404).json({ message: "Tour id not found!" });

//     const { user, comment, rating } = req.body;
//     const existingReview = tour.reviews.find(
//       (rev) => rev.user.toString === user
//     );
//     if (existingReview) {
//       return res
//         .status(400)
//         .json({ message: "You have already reviewed this tour!" });
//     }

//     const newReview = { user, rating, comment };
//     tour.reviews.push(newReview);

//     const totalRating = tour.reviews.reduce((acc, rev) => acc + rev.rating);
//     tour.averageRating = totalRating / rating.length;

//     tour.save();
//     res.status(201).json({ message: "Review added successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const addReview = async (req, res) => {
  try {
    const tourId = req.params.tourId;

    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    const { user, comment, rating } = req.body;

    const existingReview = tour.reviews.find(
      (rev) => rev.user.toString() === user
    );

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this tour!" });
    }

    const newReview = { user, rating, comment };
    tour.reviews.push(newReview);

    const totalRating = tour.reviews.reduce((acc, rev) => acc + rev.rating, 0);
    tour.averageRating = totalRating / tour.reviews.length;
    await tour.save(); // ✅ Await save

    res.status(201).json({ message: "Review added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
