const Restaurant = require("../models/restaurant");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Fetch all restaurants with search and sort functionality
exports.getAllRestaurants = catchAsyncErrors(async (req, res) => {
    const apiFeatures = new APIFeatures(Restaurant.find(), req.query)
    .search()
    .sort()

    const restaurants = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: restaurants.length,
        restaurants: restaurants,
    });
});

// Create Restaurant
exports.createRestaurant = catchAsyncErrors(async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({
        success: true,
        restaurant,
    });
});

// Get Restaurant Details
exports.getRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);    
    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }
    res.status(200).json({
        success: true,
        restaurant,
    });
});

// Delete Restaurant
exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }
    res.status(204).json({
        success: true,
        message: "Restaurant deleted successfully",
    });
});



