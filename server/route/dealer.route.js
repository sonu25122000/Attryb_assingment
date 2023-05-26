const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DealerModel = require("../modal/carDetails.modal");
const dealerRouter = express.Router();



// particular dealer data
dealerRouter.get("/car", async (req, res) => {
  const {dealerID} = req.body;
  try {
    const car = await DealerModel.find({ dealerID })
    res.send(car);
  } catch (err) {
    res.send({
      msg: "somthing went wrong! cannot Get Car Details",
      error: err.message,
    });
  }
});

// add car details by the dealer
dealerRouter.post("/add", async (req, res) => {
  //   res.send(req.body);
  try {
    const product = new DealerModel(req.body);
    await product.save();
    res.send({ msg: "Product has been added successfully" });
  } catch (err) {
    res.send({
      msg: "somthing went wrong! cannot add the product",
      error: err.message,
    });
  }
});

// update
dealerRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await DealerModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ msg: `Product with ID: ${ID} has been updated successfully` });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot update", error: err.message });
  }
});

// delete
dealerRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await DealerModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: `Product with ID: ${ID} has been deleted successfully` });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot delete", error: err.message });
  }
});

// search

dealerRouter.get("/search", async (req, res) => {
  const { name, manufacturer, year } = req.query;
  console.log({ name, manufacturer, year });
  try {
    let query = {
      $and: [{ manufacturer: { $regex: manufacturer, $options: "i" } }],
    };
    if (name) {
      query.$and.push({ name:  { $regex: name, $options: "i" } });
    }
    if (year) {
      query.$and.push({ year: parseInt(year) });
    }
    // console.log(query);
    const carData = await DealerModel.find(query);
    // Search for matching cars

    return res.status(200).send({
      cars: carData,
      totalPages: Math.round(carData.length / 8),
    });
  } catch (err) {
    console.log(err);
    return res.status(501).send(err);
  }
});

module.exports = dealerRouter;
