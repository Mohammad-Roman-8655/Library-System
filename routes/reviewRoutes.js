const express = require("express");
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require("../controllers/reviewController");

router.get("/:id/reviews/", getReviews);
router.post("/:id/reviews/", addReview);
router.put("/:id/reviews/:reviewId", updateReview);
router.delete("/:id/reviews/:reviewId", deleteReview);

module.exports = router;
