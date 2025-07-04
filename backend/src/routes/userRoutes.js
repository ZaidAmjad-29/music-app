// module imports
const express = require("express");
const jwtFilter = require("../middlewares/requestFilter");
const upload = require("../utils/multer");

const {
  register,
  login,
  getAllUsers,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/authController");

// variable initializations
const router = express.Router();

router.route("/users").get(jwtFilter.checkRequest, getAllUsers);

router.route("/user/register").post(upload.single("profileImage"), register);

router.route("/user/login").post(login);

router.route("/user/forgot-password").post(forgotPassword);

router.route("/user/reset-password/:token").patch(resetPassword);

router
  .route("/user/update-password")
  .patch(jwtFilter.checkRequest, updatePassword);

module.exports = router;
