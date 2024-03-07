const express = require("express");
const booksController = require("../controllers/booksController");
const router = express.Router();

// @route - /api/v1/bootcamps/
router
  .route("/")
  .get(booksController.getAllBootcamps)
  .post(booksController.createNewBootcamp);

// @route - /api/v1/bootcamps/someid
router
  .route("/:id")
  .put(booksController.updateBootcampById)
  .delete(booksController.deleteBootcampById);

module.exports = router;