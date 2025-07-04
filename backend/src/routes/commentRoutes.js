const express = require("express");
const commentController = require("../controllers/commentController");
const jwtFilter = require("../middlewares/requestFilter");

const router = express.Router();

router.post("/comment/:id", jwtFilter.checkRequest, commentController.addComment);
router.get('/comment/:id', jwtFilter.checkRequest , commentController.getAllComments)
router.delete('/comment/:id', jwtFilter.checkRequest ,commentController.deleteComment )


module.exports = router