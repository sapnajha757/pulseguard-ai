// backend/models/User.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

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
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'family', 'user', 'admin'],
      default: 'patient',
    },
    lastLogin: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    walletAddress: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      match: [/^0x[a-fA-F0-9]{40}$/, 'Please provide a valid Ethereum address'],
    },
    // Connections and Custom Medical Profiles
    doctorDetails: {
      name: String,
      specialty: String,
      email: String,
      phone: String,
      connected: { type: Boolean, default: false },
      connectedDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    familyDetails: {
      name: String,
      relation: String,
      email: String,
      phone: String,
      connected: { type: Boolean, default: false },
      connectedFamilyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    diseaseInfo: {
      condition: String,
      severity: String,
      diagnosedYear: String,
    },
    connectedPatients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true }
);

// Pre‑save hook – hash password if it was modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method – compare plain password with hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method – generate JWT for the user
  userSchema.methods.generateAuthToken = function () {
    const payload = { id: this._id, role: this.role, walletAddress: this.walletAddress };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
    return token;
  };

// Instance method – generate password‑reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);