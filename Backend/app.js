const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3005;
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const mongoUrl = "mongodb+srv://admin:root@cluster0.2mnwqq9.mongodb.net/db1";
app.use(morgan("dev"));
app.use(cors());
mongoose
  .connect(mongoUrl)
  .then((res) => console.log("> Connected..."))
  .catch((err) => {
    console.log(`> Error while connecting to mongoDB : ${err.message}`);
    process.exit(1);
  });
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Create a User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
});

// Create a User model
const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all users
app.get("/get/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res) => {
  res.json("404 Not Found");
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
