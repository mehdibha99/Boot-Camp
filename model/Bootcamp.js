const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/GeoCoder");

const BootCampSchema = mongoose.Schema(
  {
    name: {
      required: [true, "Please provide an Name"],
      type: String,
      trim: true,
      maxlength: [50, "the max length for name is 50"],
      unique: true,
    },
    slug: String,
    description: {
      required: [true, "Please provide an Description"],
      type: String,
      maxlength: [500, "the max length for description is 500"],
    },
    website: {
      type: String,
      match:
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },
    phone: {
      type: String,
      maxlength: [20, "the max length for phone is 20"],
    },
    email: {
      type: String,
      required: [true, "Please provide an Email"],
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    address: String,
    location: {
      type: {
        type: String,
        require: true,
        enum: ["Point"],
      },
      coordinates: {
        required: false,
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
      required: [true, "Please provide an careers"],
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
    averageRating: {
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//make a slug from the name of BootCamp
BootCampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//get all the information for coordination
BootCampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  const {
    formattedAddress,
    latitude,
    longitude,
    country,
    city,
    stateCode,
    zipCode,
    streetName,
    streetNumber,
    countryCode,
    provider,
  } = loc[0];
  this.location = {
    type: "Point",
    coordinates: [longitude, latitude],
    formattedAddress,
    city,
    zipCode,
    country: countryCode,
    state: stateCode,
    street: streetName,
  };
  this.address = undefined;
  next();
});

//delete courses from the bootCamp
BootCampSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`bootcamp ${this._id} removed`);
    await this.model("Course").deleteMany({ bootcamp: this._id });
    next();
  }
);

//reverse populate to virtuals
BootCampSchema.virtual("courses", {
  ref: "Course",
  foreignField: "bootcamp",
  localField: "_id",
  justOne: false,
});

module.exports = mongoose.model("BootCamp", BootCampSchema);
