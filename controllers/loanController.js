const Loan = require("../models/Loan");
const mongoose = require("mongoose");

// GET /loans - Retrieve all loans
exports.getLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate("user book");
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /loans - Create a new loan
exports.createLoan = async (req, res) => {
    try {
        const { user, book, dueDate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(book)) {
            return res.status(400).json({ message: "Invalid user or book ID" });
        }

        const loan = new Loan({ user, book, dueDate });
        await loan.save();

        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /loans/:id - Update loan details
exports.updateLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid loan ID format" });
        }

        const loan = await Loan.findByIdAndUpdate(id, req.body, { new: true });

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /loans/:id - Mark loan as returned
exports.returnLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid loan ID format" });
        }

        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        loan.returned = true;
        await loan.save();

        res.status(200).json({ message: "Loan marked as returned", loan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
