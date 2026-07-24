// backend/services/blockchain.service.js
const { ethers } = require('ethers');
const path = require('path');
require('dotenv').config();

const rpcUrl = process.env.BLOCKCHAIN_RPC_URL || process.env.POLYGON_RPC_URL;
const privateKey = process.env.DEPLOYER_PRIVATE_KEY || process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const isConfigured = rpcUrl && privateKey && contractAddress;
if (!isConfigured) {
  console.warn('⚠️ Missing BLOCKCHAIN environment variables. Services will operate in fallback/mock mode.');
}

const provider = isConfigured ? new ethers.JsonRpcProvider(rpcUrl) : null;
const wallet = (isConfigured && provider) ? new ethers.Wallet(privateKey, provider) : null;

let contract = null;
if (isConfigured && wallet) {
  try {
    const artifactPath = path.resolve(__dirname, '../../artifacts/contracts/PulseGuardAudit.sol/PulseGuardAudit.json');
    const { abi } = require(artifactPath);
    contract = new ethers.Contract(contractAddress, abi, wallet);
  } catch (err) {
    console.warn('⚠️ Could not load PulseGuardAudit contract ABI artifact:', err.message);
  }
}

/**
 * Generate a SHA‑256 hash of the supplied fields and convert to bytes32.
 * Returns a 0x‑prefixed hex string of length 66 (bytes32).
 */
function hashToBytes32(...parts) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  parts.forEach(p => hash.update(String(p)));
  const digest = hash.digest('hex');
  return '0x' + digest; // fits bytes32
}

/**
 * Store an audit record on‑chain.
 * @param {Object} data - { userId, walletAddress, eventType, riskLevel, alertType, timestamp }
 */
async function createAuditLog(data) {
  const { walletAddress = '0x0000000000000000000000000000000000000000', eventType, riskLevel = '', alertType = '', timestamp = Date.now() } = data;
  const hash = hashToBytes32(walletAddress, eventType, riskLevel, alertType, timestamp);
  if (!contract) {
    return { hash, transactionHash: '0x' + require('crypto').randomBytes(32).toString('hex') };
  }
  const tx = await contract.addAuditRecord(hash, eventType);
  const receipt = await tx.wait();
  return { hash, transactionHash: receipt.transactionHash };
}

/** Alias for legacy import name used in existing code */
async function addEvent(eventType, hash) {
  if (!contract) {
    return '0x' + require('crypto').randomBytes(32).toString('hex');
  }
  const tx = await contract.addAuditRecord(hash, eventType);
  const receipt = await tx.wait();
  return receipt.transactionHash;
}

/** Retrieve all audit records from the contract */
async function getAllAudits() {
  if (!contract) {
    return [];
  }
  return await contract.getAuditRecords();
}

module.exports = {
  createAuditLog,
  addEvent,
  getAllAudits,
};
