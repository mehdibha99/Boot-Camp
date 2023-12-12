const express = require("express");
const routes = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} = require("../controller/admin");
const User = require("../model/User");
const advancedQuery = require("../middleware/advancedQuery");
const { protect, authorize } = require("../middleware/auth");
routes.use(protect);
routes.use(authorize("admin"));

routes.route("/").get(advancedQuery(User), getUsers).post(createUser);
routes.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = routes;
