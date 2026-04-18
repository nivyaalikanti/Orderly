const Order = require("../models/order");
const FoodItem = require("../models/foodItem");
const Cart = require("../models/cartModel");
const { ObjectId } = require("mongodb");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const dotenv = require("dotenv");

//setting up config file
dotenv.config({ path: "./config/config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { session_id } = req.body;

  try {
    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer"],
    });

    // Get cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: "items.foodItem",
        select: "name price images",
      })
      .populate({
        path: "restaurant",
        select: "name",
      });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Build delivery info with fallbacks
    let deliveryInfo = {
      address: session.shipping_details?.address?.line1 || "N/A",
      city: session.shipping_details?.address?.city || "N/A",
      phoneNo: session.customer_details?.phone || "N/A",
      postalCode: session.shipping_details?.address?.postal_code || "N/A",
      country: session.shipping_details?.address?.country || "N/A",
    };

    // Build order items
    let orderItems = cart.items.map((item) => ({
      name: item.foodItem.name,
      quantity: item.quantity,
      image: item.foodItem.images?.[0]?.url || "/images/placeholder.png",
      price: item.foodItem.price,
      fooditem: item.foodItem._id,
    }));

    // Build payment info
    let paymentInfo = {
      id: session.payment_intent,
      status: session.payment_status,
    };

    // Calculate amounts from cart items (more reliable than Stripe)
    const itemsPrice = cart.items.reduce((sum, item) => {
      return sum + item.foodItem.price * item.quantity;
    }, 0);
    const deliveryCharge = 50; // Fixed delivery charge
    const finalTotal = itemsPrice + deliveryCharge;

    // Create order
    const order = await Order.create({
      orderItems,
      deliveryInfo,
      paymentInfo,
      deliveryCharge,
      itemsPrice,
      finalTotal,
      user: req.user._id,
      restaurant: cart.restaurant._id,
      paidAt: Date.now(),
    });

    // Delete cart after order is created
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
});

// Get single order   =>   /api/v1/orders/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("restaurant")
    .exec();

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  // Get the user ID from req.user
  const userId = req.user._id;
  // Find orders for the specific user using the retrieved user ID
  const orders = await Order.find({ user: userId })
    .populate("user", "name email")
    .populate("restaurant")
    .exec();

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.finalTotal;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
