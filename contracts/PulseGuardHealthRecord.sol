// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PulseGuardHealthRecord
 * @notice Decentralized medical record store for PulseGuard AI on Polygon Amoy.
 * @dev Stores patient medical records, risk scores, prescribed medicines, and doctor wallets on-chain.
 */
contract PulseGuardHealthRecord {
    struct MedicalRecord {
        string patientId;
        string medicineName;
        uint256 riskScore;
        uint256 timestamp;
        address doctorWallet;
    }

    // Mapping from patient ID => array of MedicalRecord
    mapping(string => MedicalRecord[]) private patientRecords;

    // Events
    event MedicalRecordStored(
        string indexed patientId,
        string medicineName,
        uint256 riskScore,
        uint256 timestamp,
        address indexed doctorWallet
    );

    /**
     * @notice Store a new medical record for a patient.
     * @param _patientId Unique ID of the patient
     * @param _medicineName Name of the medicine
     * @param _riskScore AI-predicted risk score (0-100)
     */
    function storeMedicalRecord(
        string memory _patientId,
        string memory _medicineName,
        uint256 _riskScore
    ) external {
        require(bytes(_patientId).length > 0, "Patient ID cannot be empty");
        require(bytes(_medicineName).length > 0, "Medicine name cannot be empty");
        require(_riskScore <= 100, "Risk score must be between 0 and 100");

        MedicalRecord memory newRecord = MedicalRecord({
            patientId: _patientId,
            medicineName: _medicineName,
            riskScore: _riskScore,
            timestamp: block.timestamp,
            doctorWallet: msg.sender
        });

        patientRecords[_patientId].push(newRecord);

        emit MedicalRecordStored(
            _patientId,
            _medicineName,
            _riskScore,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @notice Retrieve all on-chain medical history for a patient.
     * @param _patientId Unique ID of the patient
     * @return Array of MedicalRecord structs
     */
    function getMedicalHistory(string memory _patientId)
        external
        view
        returns (MedicalRecord[] memory)
    {
        return patientRecords[_patientId];
    }
}
