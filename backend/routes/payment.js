const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
} = require("../controllers/paymentController");

router.route("/payment/new").post(authController.protect, newOrder);
router.route("/order/:id").get(authController.protect, getSingleOrder);
router.route("/orders/me").get(authController.protect, myOrders);
router.route("/admin/orders").get(authController.protect, allOrders);
// router.route("/retrieveUser").get(paymentDetails);

module.exports = router;
