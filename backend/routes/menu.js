const express = require("express");
const router = express.Router({mergeParams: true});
const { getallMenus, getMenuById, createMenu, deleteMenu, addItemToMenu } = require("../controllers/menuController");
const { protect } = require("../controllers/authController");
const { authorizeRoles } = require("../middleware/authorizeRoles");


router.route("/").get(getallMenus).post(protect, authorizeRoles("admin"), createMenu);
router.route("/:menuId").get(getMenuById).delete(protect, authorizeRoles("admin"), deleteMenu);
router.route("/:menuId/items").post(protect, authorizeRoles("admin"), addItemToMenu);


module.exports = router;