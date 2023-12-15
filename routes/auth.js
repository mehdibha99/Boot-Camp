const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout,
} = require("../controller/auth");
const router = express.Router();
const { protect } = require("../middleware/auth");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);
router.route("/updateDetails").put(protect, updateDetails);
router.route("/updatePassword").put(protect, updatePassword);
router.route("/logout").get(logout);
module.exports = router;
