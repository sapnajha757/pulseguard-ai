// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PulseGuard {
    enum RecordType { MEDICINE_ADHERENCE, RISK_ASSESSMENT, EMERGENCY_ALERT }

    struct MedicalRecord {
        uint256 timestamp;
        bytes32 recordHash;
        RecordType recordType;
    }

    MedicalRecord[] public records;

    event RecordAdded(uint256 indexed id, address indexed sender, bytes32 recordHash, RecordType recordType, uint256 timestamp);

    function addRecord(bytes32 _hash, RecordType _type) external returns (uint256) {
        uint256 id = records.length;
        records.push(MedicalRecord({timestamp: block.timestamp, recordHash: _hash, recordType: _type}));
        emit RecordAdded(id, msg.sender, _hash, _type, block.timestamp);
        return id;
    }

    function getRecords(uint256 start, uint256 count) external view returns (MedicalRecord[] memory) {
        uint256 end = start + count;
        if (end > records.length) {
            end = records.length;
        }
        uint256 length = end - start;
        MedicalRecord[] memory slice = new MedicalRecord[](length);
        for (uint256 i = 0; i < length; i++) {
            slice[i] = records[start + i];
        }
        return slice;
    }
}
