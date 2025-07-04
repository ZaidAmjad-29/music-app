const express = require("express");
const favController = require("../controllers/favController");
const jwt = require("../middlewares/requestFilter");

const router = express.Router();

router
  .route("/favorite/:id")
  .post(jwt.checkRequest, favController.addFavorite)
  .delete(jwt.checkRequest, favController.removeFavorite);

router.route("/favorites").get(jwt.checkRequest, favController.getFavorites);

module.exports = router;
