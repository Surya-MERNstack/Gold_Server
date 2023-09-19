const mongoose = require("mongoose");

const goldRateSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  rate: { type: Number },
  carat: { type: String },
  weight: { type: Number },
  value: { type: Number },
});

module.exports = mongoose.model("GoldRate", goldRateSchema);
