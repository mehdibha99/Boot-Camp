const mongoose = require("mongoose");

const BootCampSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    trim: true,
    maxlength: 50,
    unique: true,
  },
  description: {
    require: true,
    type: String,
    maxlength: 500,
  },
  website: {
    type: String,
    match:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  },
  phone: {
    type: String,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  location: {
    type: {
      type: String,
      require: true,
      enum: ["Point"],
    },
    coordinates: {
      require: true,
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    zipCode: String,
    state: String,
    country: String,
  },
  careers: {
    type: [String],
    require: true,
    //enum mean the only available think
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: 1,
    max: 10,
  },
  averageCost: {
    type: Number,
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BootCamp", BootCampSchema);
