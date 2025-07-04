const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "Please provide a name"],
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      select: false,
      type: String,
      required: true,
      minlength: [8, "password minimum length is 8 characters"],
    },
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
    },
    uploadedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkPassword = async function (
  userPassword,
  hashedPassword
) {
  return await bcrypt.compare(userPassword, hashedPassword);
};

userSchema.methods.generateRandomTokenForResetPassword = async function () {
  //Generating a random 32 character string token to send to user via email.
  const resetToken = crypto.randomBytes(32).toString("hex");

  //Hashed form of above token is saved in database to validate the request.
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Reset Token will only be valid for 10 minutes after creating.
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  // console.log("Plain token "+resetToken+" Hashed Token "+this.passwordResetToken);

  //Sending the plain token text in response.
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
