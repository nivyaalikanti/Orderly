const express = require("express");
const router = express.Router({mergeParams: true});
const restaurantController = require("../controllers/restaurantController");

const { protect } = require("../controllers/authController");
const { authorizeRoles } = require("../middleware/authorizeRoles");


