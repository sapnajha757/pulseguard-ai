// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PulseGuardAudit
 * @dev Stores immutable SHA‑256 hash proofs of healthcare events.
 *      Only the contract owner (the backend service) can write records.
 */
contract PulseGuardAudit is Ownable {
    struct AuditRecord {
        bytes32 eventHash;   // 0x‑prefixed SHA‑256 hash
        string eventType;    // e.g. MEDICINE_TAKEN, RISK_ASSESSMENT, EMERGENCY_ALERT
        uint256 timestamp;   // block timestamp when recorded
        address userWallet;  // wallet address of the patient/user
    }

    AuditRecord[] private records;

    event AuditRecorded(
        bytes32 indexed eventHash,
        string eventType,
        address indexed user,
        uint256 timestamp
    );

    /**
     * @notice Add a new audit record.
     * @dev Only the contract owner can call this (backend service).
     * @param eventHash SHA‑256 hash of the off‑chain data.
     * @param eventType Short string describing the event.
     */
    function addAuditRecord(bytes32 eventHash, string calldata eventType, address userWallet) external onlyOwner {
        AuditRecord memory rec = AuditRecord({
            eventHash: eventHash,
            eventType: eventType,
            timestamp: block.timestamp,
            userWallet: userWallet
        });
        records.push(rec);
        emit AuditRecorded(eventHash, eventType, userWallet, block.timestamp);
    }

    /**
     * @notice Retrieve all stored audit records.
     * @return Array of AuditRecord structs.
     */
    function getAuditRecords() external view returns (AuditRecord[] memory) {
        return records;
    }
}
