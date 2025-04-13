import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1744570732~exp=1744574332~hmac=1bd72c105ee9bf242a0553ff8ab721973ed0f44e22f4f3f08f62dae57a410b99&w=740",
        localpath: "",
      },
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, process.env.BCRYPT_SALT);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.envJWT_ACCESS_TOKEN_EXPIRE,
    },
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    },
  );
};
userSchema.methods.generateTemporaryToken = async function () {
  const token = crypto.randomBytes(16).toString("hex");
  const tokenExpiry = Date.now() + 20 * 60 * 1000;
  return { token, tokenExpiry };
};
export default User;
