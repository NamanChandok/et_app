const express = require("express");
const {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Public routes

// @route   GET /api/stations
router.get("/", getStations);

// @route   GET /api/stations/:id
router.get("/:id", getStationById);

// Protected routes

// @route   POST /api/stations/create
router.post("/create", verifyToken, createStation);

// @route   PUT /api/stations/:id
router.put("/:id", verifyToken, updateStation);

// @route   DELETE /api/stations/:id
router.delete("/:id", verifyToken, deleteStation);

module.exports = router;
