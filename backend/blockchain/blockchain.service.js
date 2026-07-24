// backend/blockchain/blockchain.service.js
const { ethers } = require('ethers');
const path = require('path');
require('dotenv').config();

const { POLYGON_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;
const isConfigured = POLYGON_RPC_URL && PRIVATE_KEY && CONTRACT_ADDRESS;

if (!isConfigured) {
  console.warn('⚠️ Blockchain environment variables missing (POLYGON_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS). Operations will run in mock/local fallback mode.');
}

const provider = isConfigured ? new ethers.JsonRpcProvider(POLYGON_RPC_URL) : null;
const wallet = (isConfigured && provider) ? new ethers.Wallet(PRIVATE_KEY, provider) : null;

let contract = null;
if (isConfigured && wallet) {
  try {
    const artifactPath = path.resolve(__dirname, 'contracts', 'artifacts', 'contracts', 'PulseGuardLog.sol', 'PulseGuardLog.json');
    const { abi } = require(artifactPath);
    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
  } catch (err) {
    console.warn('⚠️ Blockchain contract artifact or initialization error:', err.message);
  }
}

module.exports = {
  /**
   * Store an event hash on‑chain.
   * @param {string} eventType – e.g., MEDICINE_TAKEN
   * @param {string} dataHash – 0x prefixed SHA‑256 hash
   * @returns {Promise<string>} transaction hash
   */
  async addEvent(eventType, dataHash) {
    if (!contract) {
      return '0x' + require('crypto').randomBytes(32).toString('hex');
    }
    const tx = await contract.addEvent(eventType, dataHash);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  },

  /** Retrieve events for a wallet address */
  async getEvents(address) {
    if (!contract) {
      return [];
    }
    return await contract.getEvents(address);
  },
};
