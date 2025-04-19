import Tour from "./tour.model.js";

export const createTour = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      country,
      city,
      price,
      duration,
      stops,
      startingDate,
      capacity,
      averageRating,
    } = req.body;

    // const createdBy = req.user.id;

    const image = req.file ? req.file.path : null;

    const tour = new Tour({
      title: title,
      description,
      location,
      country,
      city,
      price,
      duration,
      stops,
      startingDate,
      capacity,
      averageRating,
      image,
      // createdBy,
    });
    await tour.save();
    res.status(201).json({ message: "Tour created", tour });
  } catch (error) {
    res.status(400).json({ message: "Error creating Tour", error: error });
  }
};

export const getTours = async (req, res) => {
  // console.log(req.query, "req.query");
  // const { page, limit } = req.query;
  // const pageNum = Number(page);
  // const limitNum = Number(limit);
  // const skip = (page - 1) * limit;

  // let filter = {};

  // const search = req.query.search;
  // const location = req.query.location;
  // if (search) {
  //   filter.title = { $regex: search, $options: "i" };
  // }
  // if (location) {
  //   filter.location = { $regex: location, $options: "i" };
  // }

  // try {
  //   const tours = await Tour.find(filter)
  //     .limit(limitNum)
  //     .skip(skip)
  //     .populate("createdBy", "firstName lastName")
  //     .populate("reviews.user", "firstName lastName");
  //   res.status(200).json({ result: tours.length, tours });
  // } catch (error) {
  //   console.log(error, "errorrr");
  //   res.status(500).json({ message: "Server Error", error: error });
  // }

  try {
    const { title, location, rating, sort, page = 1, limit = 9 } = req.query;
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (rating) {
      filter.averageRating = { $gte: Number(rating) };
    }

    let query = Tour.find(filter)
      .populate("createdBy", "firstName lastName")
      .populate("reviews.user", "firstName lastName");

    if (sort) {
      query = query.sort(sort);
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    query = query.skip(skip).limit(limitNum);
    const tours = await query.exec();
    const totalTours = await Tour.countDocuments(filter);
    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      result: totalTours,
      data: { tours },
    });
  } catch {
    console.log(error, "errorrr");
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findById(tourId)
      .populate("createdBy", "firstName lastName")
      .populate("reviews.user", "firstName lastName");
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
export const updateTour = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { title, description, location, country, city, price } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Update only provided fields
    if (title) tour.title = title;
    if (description) tour.description = description;
    if (location) tour.location = location;
    if (country) tour.country = country;
    if (city) tour.city = city;
    if (price) tour.price = price;
    const image = req.file ? req.file.path : null;
    tour.image = image;

    await tour.save();

    res.status(200).json({ message: "Tour updated successfully", tour });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findByIdAndDelete(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour nof found" });
    }
    res.status(200).json({ message: "Tour Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const addReview = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const user = req.user.id;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const { rating, comment } = req.body;

    const existingReview = tour.reviews.find(
      (rev) => rev.user.toString() === user
    );

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already revied this tour" });
    }
    const newReview = { user, rating, comment };
    tour.reviews.push(newReview);

    const totalRating = tour.reviews.reduce((acc, rev) => acc + rev.rating, 0);
    tour.averageRating = totalRating / tour.reviews.length;

    tour.save();
    res.status(201).json({ message: "Review Added successfully", tour });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
