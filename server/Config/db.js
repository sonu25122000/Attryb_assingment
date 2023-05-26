const mongoose = require("mongoose");
require("dotenv").config();

const connecion = mongoose.connect(process.env.mongoURL);

module.exports = { connecion };
