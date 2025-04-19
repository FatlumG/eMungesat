import mongoose from "mongoose";
import bcrypt from "bcrypt";
import vaildator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    phoneNumber: { type: String, default: "" },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
