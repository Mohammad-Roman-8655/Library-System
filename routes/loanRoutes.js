const express = require("express");
const router = express.Router();
const { getLoans, createLoan, updateLoan, returnLoan } = require("../controllers/loanController");

router.get("/", getLoans);
router.post("/", createLoan);
router.put("/:id", updateLoan);
router.delete("/:id", returnLoan);

module.exports = router;
