import Booking from "./booking.model.js";
import Tour from "../tours/tour.model.js";
import stripe from "../../config/stripe.js";

// export const createBooking = async (req, res) => {
//   try {
//     const tourId = req.params.tourId;
//     const user = req.user.id;
//     const { guests, date } = req.body;
//     const tour = await Tour.findById(tourId);
//     if (!tour) {
//       return res.status(404).json({ message: "Tour not found" });
//     }

//     const amount = tour.price * guests * 100;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       metadata: {
//         tourId: tourId.toString(),
//         userId: user.toString(),
//         guests: guests.toString(),
//         date: date,
//       },
//     });

//     const booking = new Booking({
//       user,
//       tour: tourId,
//       guests,
//       date,
//       status: "pending",
//       paymentIntentId: paymentIntent.id,
//     });

//     await booking.save();

//     res.status(201).json({
//       message: "Booking cereated successfully",
//       booking,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };
export const createBookingAndCheckoutSession = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const userId = req.user.id;
    const { guests, date } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // 1. Create a product on Stripe
    const product = await stripe.products.create({
      name: tour.title,
      description: tour.description,
    });

    // 2. Create a price based on guests and tour price
    const price = await stripe.prices.create({
      unit_amount: tour.price * 100, // Stripe requires amount in cents
      currency: 'usd',
      product: product.id,
    });

    // 3. Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: price.id,
          quantity: guests,
        },
      ],
      metadata: {
        userId,
        tourId,
        guests,
        date,
      },
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    });

    // 4. Create a booking with status pending
    const booking = new Booking({
      user: userId,
      tour: tourId,
      guests,
      date,
      status: 'pending',
      // paymentIntentId: session.payment_intent, // might be null until paid
      checkoutSessionId: session.id,
    });

    await booking.save();

    res.status(200).json({
      url: session.url,
      bookingId: booking._id,
    });
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: "Server Error", error: err });
  }
};



export const getMyBooking = async (req, res) => {
  try {
    const userID = req.user.id;
    const bookings = await Booking.find({ user: userID }).populate(
      "tour",
      "title description location price startingDate duration image averageRating stops capacity"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const user = req.user.id;
    const { guests, date } = req.body;
    const booking = await Booking.findOne({
      _id: bookingId,
      user,
      status: "pending",
    });
    if (!booking) {
      return res.status(404).json({ message: "Pending Booking not found" });
    }
    const tour = await Tour.findById(booking.tour);
    const amount = tour.price * guests * 100;
    await stripe.paymentIntents.update(booking.paymentIntentId, {
      amount: amount,
      metadata: {
        tourId: booking.tour.toString(),
        userId: user.toString(),
        guests: guests.toString(),
        date: date,
      },
    });
    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "canceled";
    await booking.save();
    res.status(200).json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// export const hadelStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//     console.log("Webhook received", event.type);
//   } catch (error) {
//     console.error("Webhook Error:", error.message);
//     return res.status(400).send("Webhook Error:", error.message);
//   }
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const paymentIntent = event.data.object;
//       console.log("Payment succeeded for intent:", paymentIntent.id);
//       const updateBooking = await Booking.findOneAndUpdate(
//         {
//           paymentIntentId: paymentIntent.id,
//         },
//         {
//           status: "confirmed",
//         },
//         {
//           new: true,
//         }
//       );
//       console.log("Updated booking:", updateBooking);
//       break;
//     case "payment_intent.payment_failed":
//       const failedPayment = event.data.object;
//       console.log("Payment failed for intent:", failedPayment.id);
//       await Booking.findOneAndUpdate(
//         { paymentIntentId: failedPayment.id },
//         {
//           status: "canceled",
//           paymentStatus: "failed",
//         },
//         { new: true }
//       );
//       break;
//     default:
//       console.log(`Unhandeled event type ${event.type}`);
//   }
//   res.json({ recieved: true });
// };

export const createCheckoutSession = async (req, res) => {
  const { quantity, bookingId } = req.body;

  const booking = await Booking.findById(bookingId);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: booking.paymentIntentId,
          quantity: quantity || 1,
        },
      ],
      metadata: {
        bookingId: bookingId,
      },
      success_url:
        "http://localhost:5174/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5174/cancel",
    });

    await Booking.findOneAndUpdate(bookingId, {
      paymentIntentId: session.payment_intent,
      checkoutSessionId: session.id,
      status: "pending",
    });

    res.status(200).json({ url: session.url, session: res.session.id });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: "Could not create Stripe session" });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Webhook received:", event.type);
  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("Payment succeeded for intent:", paymentIntent.id);

      try {
        const updateBooking = await Booking.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { status: "confirmed" },
          { new: true }
        );
        console.log("Updated booking:", updateBooking);
      } catch (err) {
        console.error("Error updating booking:", err.message);
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const failedPayment = event.data.object;
      console.log("Payment failed for intent:", failedPayment.id);

      try {
        await Booking.findOneAndUpdate(
          { paymentIntentId: failedPayment.id },
          {
            status: "canceled",
            paymentStatus: "failed",
          },
          { new: true }
        );
      } catch (err) {
        console.error("Error updating failed booking:", err.message);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};

export const confirmBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const user = req.user.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      user,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "confirmed";
    booking.paymentStatus = "completed";

    await booking.save();
    res
      .status(200)
      .json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
