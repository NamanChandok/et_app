const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Station name is required"],
      trim: true,
      maxlength: [100, "Station name cannot exceed 100 characters"],
    },
    location: {
      lat: {
        type: Number,
        required: [true, "Latitude is required"],
        min: [-90, "Latitude must be between -90 and 90"],
        max: [90, "Latitude must be between -90 and 90"],
      },
      lng: {
        type: Number,
        required: [true, "Longitude is required"],
        min: [-180, "Longitude must be between -180 and 180"],
        max: [180, "Longitude must be between -180 and 180"],
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    powerOutput: {
      type: Number,
      required: [true, "Power output is required"],
      min: [0, "Power output cannot be negative"],
      max: [350, "Power output cannot exceed 350kW"],
    },
    connectorType: {
      type: String,
      required: [true, "Connector type is required"],
      enum: ["CCS", "CHAdeMO", "Type2", "Tesla"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Station", stationSchema);
