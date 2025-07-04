const User = require("../models/userModel");
const { createToken } = require("../utils/createJwtToken");
const sendMail = require("../utils/email");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = async (req, res, next) => {
  const user = req.userId;
  console.log(user);

  const users = await User.find();
  res.status(200).json({ status: true, message: "Data found", data: users });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, bio } = req.body;

  let profileImagePath = "";
  if (req.file) {
    profileImagePath = `/public/profiles/${req.file.filename}`;
  }
  else{
    profileImagePath = "/public/profiles/default.png"
  }

  const newUser = await User.create({
    name,
    email,
    password,
    bio,
    profileImage: profileImagePath,
  });

  const token = createToken(newUser._id);

  res.status(201).json({
    status: true,
    message: "User registered successfully",
    data: {
      user: newUser,
      token,
    },
  });
});


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ statu: false, message: "Email or password is required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res
        .status(404)
        .json({ status: false, message: "No user exist with provided email" });
    }

    const passwordMatched = await user.checkPassword(password, user.password);

    if (!user || !passwordMatched) {
      res
        .status(401)
        .json({ status: false, message: "Incorrect Email or Password" });
    }

    const token = createToken(user._id);

    res
      .status(200)
      .json({
        status: true,
        message: "Logged in Successfully",
        data: { user: user, token: token },
      });
  } catch (error) {
    console.log(error.message);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res
        .status(404)
        .json({ status: false, message: "No user found with such email" });
    }

    const resetToken = await user.generateRandomTokenForResetPassword();
    console.log(resetToken);

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/reset-password/${resetToken}`;
    const message = `Forgot your password, submit a patch request with new password to ${resetUrl}.
        \n If this is not you, ignore this.`;

    try {
      await sendMail({
        email: user.email,
        subject: "Your password reset Token",
        message,
      });

      res.status(200).json({
        status: true,
        message: "Token sent to Email",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  console.log("Param is: " + req.params.token);
  console.log("Body is: " + req.body.password);

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log("HashedToken is: " + hashedToken);

  try {
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res
        .status(400)
        .json({ status: false, messaga: "Invalid token or token has expired" });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    const token = createToken(user._id);

    res
      .status(200)
      .json({
        status: true,
        message: "Logged in Successfully",
        data: { user: user, token: token },
      });
  } catch (err) {
    console.log(err.message);
  }
};

exports.updatePassword = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select('+password');
  
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
  
      const isPasswordMatched = await user.checkPassword(
        req.body.currentPassword,
        user.password
      );
  
      if (!isPasswordMatched) {
        return res.status(401).json({ status: false, message: "Invalid current password" });
      }
  
      user.password = req.body.newPassword;
      await user.save();
  
      const token = createToken(user._id);
  
      res.status(200).json({
        status: true,
        message: "Password updated successfully",
        data: { user, token }
      });
  
    } catch (error) {
      console.error("Update password error:", error.message);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
  