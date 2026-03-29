const Menu = require("../models/menu");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get All menus
exports.getAllMenus = catchAsyncErrors(async (req, res) => {
    // filter
    const filter = req.params.storeId ? { restaurant: req.params.storeId } : {};
    const menu = await Menu.find(filter).populate("menu.items");
    res.status(200).json({
        success: true,
        count: menu.length,
        data: menu,
    });
});

// Create menu
exports.createMenu = catchAsyncErrors(async (req, res) => {
    const menu = await Menu.create(req.body);
    res.status(201).json({
        success: true,
        data: menu,
    });
});

// Delete menu
exports.deleteMenu = catchAsyncErrors(async (req, res, next) => {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
        return next(new ErrorHandler("Menu not found", 404));
    }
    res.status(204).json({
        success: true,
        message: "Menu deleted successfully",
    });
});

// Add item to menu
exports.addItemToMenu = catchAsyncErrors(async (req, res, next) => {
    const {category, items} = req.body;
    const menuId = req.params.id;
    if(!menuId){
        return next(new ErrorHandler("Menu ID is required", 400));
    }
    const menu = await Menu.findById(menuId);
    if (!menu) {
        return next(new ErrorHandler("Menu not found", 404));
    }
    const categoryIndex = menu.menu.findIndex(c => c.category === category);
    if(categoryIndex === -1){
        menu.menu.push({category, items});
    } else {
        menu.menu[categoryIndex].items.push(...items);
    }

    await menu.save();
    await menu.populate("menu.items");
    res.status(200).json({
        success: true,
        data: menu,
    }); 
});