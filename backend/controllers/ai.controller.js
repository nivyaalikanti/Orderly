const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const aiService = require("../services/aiService");
const foodItem = require("../models/foodItem");

exports.generateFoodAI = catchAsyncErrors(async (req, res, next) => {
    const {name, category, spiceLevel, price} = req.body;
    if(!name || !category || !spiceLevel || !price) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }
    const aiData = await aiService.generateFoodAI(name, category, spiceLevel, price);
    const newFoodItem = await foodItem.create({
        name: aiData.name,
        category: aiData.category,
        spiceLevel: aiData.spiceLevel,
        price: aiData.price,
    })
    res.status(200).json({
        success: true,
        data: newFoodItem
    })
});

exports.generateAndSaveFoodAI = catchAsyncErrors(async (req, res, next) => {
    const {foodId} = req.params;
    const food = await foodItem.findById(foodId);
    if(!food) {
        return res.status(404).json({
            success: false,
            message: "Food item not found"
        });
    }
    const aiData = await aiService.generateDishDescription({
        name: food.name,
        category: food.category,
        spiceLevel: food.spiceLevel,
        price: food.price,  
    })
    food.aiDescription = aiData.description;
    await food.save();
    res.status(200).json({
        success: true,
        data: food
    })
});
