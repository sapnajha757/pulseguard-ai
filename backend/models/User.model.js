// models/User.model.js
// Schema definition only — hashing hooks, methods, and validators are
// wired here but implemented in services/auth.service.js.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['patient', 'caregiver', 'admin'],
      default: 'patient',
    },
    phone: {
      type: String,
      trim: true,
    },
    emergencyContacts: [
      {
        name: { type: String, trim: true },
        phone: { type: String, trim: true },
        email: { type: String, trim: true },
        relation: { type: String, trim: true },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// TODO(services/auth.service.js): pre-save password hashing hook
// TODO(services/auth.service.js): comparePassword instance method
// TODO(services/auth.service.js): generateAuthToken instance method

module.exports = mongoose.model('User', userSchema);
