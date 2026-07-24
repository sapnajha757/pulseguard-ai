import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import abi from '../api/PulseGuardHealthRecord.json';

const Web3Context = createContext();

// Use the deployed contract address here (update this after deployment!)
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x_YOUR_CONTRACT_ADDRESS_HERE';

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const _signer = await _provider.getSigner();
        const _contract = new ethers.Contract(CONTRACT_ADDRESS, abi, _signer);

        setProvider(_provider);
        setSigner(_signer);
        setContract(_contract);
        setAccount(accounts[0]);
        setIsConnected(true);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to connect to wallet');
      }
    } else {
      setError('Please install MetaMask to use this feature');
    }
  };

  // Automatically check if wallet is connected on load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await _provider.listAccounts();
        if (accounts.length > 0) {
          const _signer = await _provider.getSigner();
          const _contract = new ethers.Contract(CONTRACT_ADDRESS, abi, _signer);
          
          setProvider(_provider);
          setSigner(_signer);
          setContract(_contract);
          setAccount(accounts[0].address);
          setIsConnected(true);
        }
      }
    };
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  // Contract Write: storeMedicalRecord
  const storeMedicalRecord = async (patientId, medicineName, riskScore) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const tx = await contract.storeMedicalRecord(patientId, medicineName, riskScore);
      await tx.wait(); // Wait for transaction to be mined
      return tx;
    } catch (err) {
      console.error('Error storing medical record:', err);
      throw err;
    }
  };

  // Contract Read: getMedicalHistory
  const getMedicalHistory = async (patientId) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const history = await contract.getMedicalHistory(patientId);
      // Format the returned proxy array into a normal JS array of objects
      return history.map(record => ({
        patientId: record.patientId,
        medicineName: record.medicineName,
        riskScore: Number(record.riskScore),
        timestamp: Number(record.timestamp),
        doctorWallet: record.doctorWallet
      }));
    } catch (err) {
      console.error('Error fetching medical history:', err);
      throw err;
    }
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected,
        connectWallet,
        storeMedicalRecord,
        getMedicalHistory,
        error
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
