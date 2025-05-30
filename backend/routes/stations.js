const express = require("express");
const {
  getStations,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Public routes

// @route   GET /api/stations
router.get("/", getStations);

// Protected routes

// @route   POST /api/stations/create
router.post("/create", verifyToken, createStation);

// @route   PUT /api/stations/update/:id
router.put("/update/:id", verifyToken, updateStation);

// @route   DELETE /api/stations/delete/:id
router.delete("/delete/:id", verifyToken, deleteStation);

module.exports = router;
