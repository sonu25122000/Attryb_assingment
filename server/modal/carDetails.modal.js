const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    list_price: { type: String, required: true },
    available_colors: [String],
    mileage: { type: String, required: true },
    power: { type: Number, required: true },
    max_speed: { type: Number, required: true },
    dealerID: { type: String, required: true },
  },
  { versionKey: false }
);

const DealerModel = mongoose.model("carDetail", dealerSchema);

module.exports = DealerModel;
