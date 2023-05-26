const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connecion } = require("./Config/db");
const { auth } = require("./middleware/auth.middleware");
const userModel = require("./modal/dealer.modal");
const dealerRouter = require("./route/dealer.route");
const DealerModel = require("./modal/carDetails.modal");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/dealer", auth);
app.use('/dealer',dealerRouter)

// get all the car data
app.get("/allcardata", async (req, res) => {
  try {
    const data = await DealerModel.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

// signup
app.post("/register", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const { password, email } = payload;
  const user = await userModel.findOne({ email });
  if (user) {
    res.send("User Already exist, please login");
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "somthing went wrong while hashing password" });
        } else {
          const user = new userModel({ ...payload, password: hash });
          await user.save();
          res.send({ msg: "You have been registered successfully" });
        }
      });
    } catch (err) {
      res.send({
        msg: "somthing went wrong! cannot register",
        error: err.message,
      });
    }
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id }, "sonu");
          await userModel.findByIdAndUpdate(
            { _id: user._id },
            { is_active: true }
          );
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "User not found!" });
    }
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot login", error: err.message });
  }
});

app.listen(process.env.port, async () => {
  try {
    await connecion;
    console.log("connected to DB");
  } catch (err) {
    console.log("server error");
  }
  console.log(`server is running at port ${process.env.port}`);
});
