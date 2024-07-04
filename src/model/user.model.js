import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumebr: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      required: false,
    },
    resume: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // auto generate timestamps
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.password);
};

const dataSchema = new mongoose.Schema({
  _id: Number,
  poster_path: String,
  title: String,
  release_date: String,
  genre: [String],
  overview: String,
  rating: Number,
  type: String,
  trending: Boolean,
  popular: Boolean,
});

const User = mongoose.model("User", userSchema);
const Data = mongoose.model("Data", dataSchema);

export default User;
export { Data };
