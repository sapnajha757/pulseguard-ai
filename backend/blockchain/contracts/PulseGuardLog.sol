// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PulseGuardLog
 * @dev Stores immutable SHA‑256 hashes of medical events on Polygon.
 *      Each event is linked to the sender address (the service account).
 */
contract PulseGuardLog {
    struct MedicalEvent {
        string eventType;   // e.g. MEDICINE_TAKEN, RISK_ASSESSMENT, EMERGENCY_ALERT
        string dataHash;    // 0x‑prefixed SHA‑256 hash
        uint256 timestamp; // block timestamp when added
    }

    // Mapping of user address => list of events
    mapping(address => MedicalEvent[]) private events;

    event EventAdded(address indexed user, string eventType, string dataHash, uint256 timestamp);

    /**
     * @notice Add a new event proof.
     * @param eventType A short string describing the event type.
     * @param dataHash 0x‑prefixed SHA‑256 hash of the off‑chain data.
     */
    function addEvent(string calldata eventType, string calldata dataHash) external {
        MedicalEvent memory ev = MedicalEvent({
            eventType: eventType,
            dataHash: dataHash,
            timestamp: block.timestamp
        });
        events[msg.sender].push(ev);
        emit EventAdded(msg.sender, eventType, dataHash, block.timestamp);
    }

    /**
     * @notice Retrieve all events stored for a given address.
     * @param user Address to query.
     * @return Array of MedicalEvent structs.
     */
    function getEvents(address user) external view returns (MedicalEvent[] memory) {
        return events[user];
    }
}
