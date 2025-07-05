const express = require("express");
const profileController = require("../controllers/profileController");
const jwt = require("../middlewares/requestFilter");
const upload = require("../utils/profileImage");

const router = express.Router();

router.get("/profile/:id", jwt.checkRequest, profileController.getUserProfile);
router.get("/me", jwt.checkRequest, profileController.getLogedInUserProfile);
router.patch(
  "/me",
  jwt.checkRequest,
  upload.single("profileImage"),
  profileController.updateUser
);

module.exports = router;
