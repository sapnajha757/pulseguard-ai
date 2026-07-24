// backend/blockchain/hash.service.js
const crypto = require('crypto');

/**
 * Compute a deterministic SHA‑256 hash of the supplied fields.
 * Returns a 0x‑prefixed hex string suitable for on‑chain storage.
 */
function sha256(...parts) {
  const hash = crypto.createHash('sha256');
  parts.forEach(p => hash.update(String(p)));
  return '0x' + hash.digest('hex');
}

module.exports = { sha256 };
