// backend/controllers/blockchain.controller.js
// Controller to interact with blockchain audit records.

const asyncHandler = require('express-async-handler');
const { getAllAudits } = require('../services/blockchain.service');

/**
 * @desc   Retrieve all audit records from the blockchain
 * @route  GET /api/v1/blockchain/events
 * @access Private (requires JWT)
 */
const getAuditEvents = asyncHandler(async (req, res) => {
  const audits = await getAllAudits();
  res.status(200).json({ success: true, data: audits });
});

module.exports = { getAuditEvents };
