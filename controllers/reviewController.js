const Review = require("../models/Review");
const Book = require("../models/Book");
const mongoose = require("mongoose");

// Get all reviews for a book
exports.getReviews = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }
        
        const reviews = await Review.find({ book: id }).populate("user", "name");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a review to a book
exports.addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, rating, comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const bookExists = await Book.findById(id);
        if (!bookExists) {
            return res.status(404).json({ message: "Book not found" });
        }

        const review = new Review({ book: id, user, rating, comment });
        await review.save();

        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const review = await Review.findOneAndUpdate(
            { _id: reviewId, book: id },
            req.body,
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const review = await Review.findOneAndDelete({ _id: reviewId, book: id });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
