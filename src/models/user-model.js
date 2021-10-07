'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  feedback: { type: Number },
  posts: { type: Array },
});

user.virtual('token').get(() => {
  let tokenObj = {
    phoneNumber: this.phoneNumber,
    firstName: this.firstName,
    lastName: this.lastName,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }

  let a = jwt.sign(tokenObj, process.env.SECRET);
  return a;
});

user.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
})

// BASIC AUTH

user.statics.authenticateBasic = async function (phoneNumber, password) {
  const user = await this.findOne({ phoneNumber });

  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('Invalid User');
}

// Bearer Auth

user.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = await thid.findOne({ phoneNumber: parsedToken.phoneNumber });

    if (user) { return user; };
    throw new Error('User Not Found');
  } catch (err) {
    throw new Error(err.message);
  }
}