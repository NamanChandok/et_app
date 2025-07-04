const Station = require("../models/Station");

// @desc    Get all stations
// @route   GET /api/stations
// @access  Public
const getStations = async (req, res) => {
  try {
    const stations = await Station.find().populate(
      "createdBy",
      "username email",
    );

    res.json({
      success: true,
      data: stations,
    });
  } catch (error) {
    console.error("Get stations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get stations",
      error: error.message,
    });
  }
};

// @desc    Get station by ID
// @route   GET /api/stations/:id
// @access  Public
const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate(
      "createdBy",
      "username email",
    );

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    res.json({
      success: true,
      data: station,
    });
  } catch (error) {
    console.error("Get station by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get station by ID",
      error: error.message,
    });
  }
};

// @desc    Create new station
// @route   POST /api/stations
// @access  Private
const createStation = async (req, res) => {
  try {
    const stationData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const station = new Station(stationData);
    await station.save();

    await station.populate("createdBy", "username email");

    res.status(201).json({
      success: true,
      message: "Station created successfully",
      data: { station },
    });
  } catch (error) {
    console.error("Create station error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create station",
      error: error.message,
    });
  }
};

// @desc    Update station
// @route   PUT /api/stations/:id
// @access  Private
const updateStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    if (station.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this station",
      });
    }

    const updatedStation = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("createdBy", "username email");

    res.json({
      success: true,
      message: "Station updated successfully",
      data: { station: updatedStation },
    });
  } catch (error) {
    console.error("Update station error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update station",
      error: error.message,
    });
  }
};

// @desc    Delete station
// @route   DELETE /api/stations/:id
// @access  Private
const deleteStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    if (station.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this station",
      });
    }

    await Station.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Station deleted successfully",
    });
  } catch (error) {
    console.error("Delete station error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete station",
      error: error.message,
    });
  }
};

const getStationsByUser = async (userId) => {
  try {
    const stations = await Station.find({ createdBy: userId }).populate(
      "createdBy",
      "username email",
    );
    return stations;
  } catch (error) {
    console.error("Get stations by user error:", error);
    return {
      success: false,
      message: "Failed to get stations for user",
      error: error.message,
    };
  }
};

module.exports = {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  getStationsByUser,
};
