const express = require("express");
const router = express.Router();
const { generateFoodDescription } = require("../controllers/aiController");
const authController = require("../controllers/authController");

// Generate food description using Groq
router.post("/generate-food-ai", authController.protect, generateFoodDescription);

module.exports = router;
