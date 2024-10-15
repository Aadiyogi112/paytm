const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@clusterpaytm.r62an.mongodb.net/Paytm"
);

const userScehma = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
  },
});

const User = mongoose.model("user", userScehma);

module.exports = User;
