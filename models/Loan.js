const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book", 
        required: true 
    },
    loanDate: { 
        type: Date,
        default: Date.now 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    returned: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

module.exports = mongoose.model("Loan", LoanSchema);
