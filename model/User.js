const mongoose = require("mongoose");

UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add the user name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please add the user email"],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  password: {
    type: String,
    require: [true, "please add the password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
