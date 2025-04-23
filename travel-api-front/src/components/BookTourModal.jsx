import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY);

function BookTourModal() {

  return <div>BookTourModal</div>;
}

export default BookTourModal;
