// This service acts as an abstraction for interacting with Polygon Amoy
// It uses ethers.js directly to talk to the blockchain or through a backend relayer.

import { ethers } from 'ethers';
import abi from '../api/PulseGuardHealthRecord.json';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x_YOUR_CONTRACT_ADDRESS_HERE';

export const polygonService = {
  // Connect Provider
  getProvider: () => {
    if (window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }
    throw new Error('MetaMask is not installed');
  },

  // Get Contract Instance
  getContract: async (withSigner = false) => {
    const provider = polygonService.getProvider();
    if (withSigner) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    }
    return new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  },

  // Example: Store a record on-chain
  storeMedicalRecord: async (patientId, medicineName, riskScore) => {
    const contract = await polygonService.getContract(true);
    const tx = await contract.storeMedicalRecord(patientId, medicineName, riskScore);
    await tx.wait();
    return tx;
  },

  // Example: Read from chain
  getMedicalHistory: async (patientId) => {
    const contract = await polygonService.getContract(false);
    return await contract.getMedicalHistory(patientId);
  }
};
