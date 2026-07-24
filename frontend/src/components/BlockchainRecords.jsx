import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export default function BlockchainRecords({ patientId }) {
  const { isConnected, connectWallet, storeMedicalRecord, getMedicalHistory, account, error } = useWeb3();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicine] = useState('');
  const [risk, setRisk] = useState('');

  const handleFetchRecords = async () => {
    if (!isConnected) return;
    setLoading(true);
    try {
      const history = await getMedicalHistory(patientId);
      setRecords(history);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleStoreRecord = async (e) => {
    e.preventDefault();
    if (!isConnected) return;
    setLoading(true);
    try {
      await storeMedicalRecord(patientId, medicine, parseInt(risk));
      setMedicine('');
      setRisk('');
      await handleFetchRecords(); // Refresh list
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 text-white">On-Chain Medical Records</h3>
      
      {error && <div className="text-red-400 mb-4">{error}</div>}

      {!isConnected ? (
        <button 
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Connect MetaMask
        </button>
      ) : (
        <div>
          <div className="mb-4 text-sm text-gray-400">
            Connected as: <span className="text-blue-400">{account}</span>
          </div>

          <form onSubmit={handleStoreRecord} className="flex gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Medicine Name" 
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
              required
            />
            <input 
              type="number" 
              placeholder="Risk Score (0-100)" 
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500 w-40"
              min="0" max="100" required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Storing...' : 'Store Record'}
            </button>
          </form>

          <button 
            onClick={handleFetchRecords}
            disabled={loading}
            className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg transition-colors mb-4"
          >
            {loading ? 'Fetching...' : 'Load History'}
          </button>

          {records.length > 0 && (
            <div className="space-y-3">
              {records.map((record, index) => (
                <div key={index} className="bg-black/20 border border-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-emerald-400">{record.medicineName}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      record.riskScore > 70 ? 'bg-red-500/20 text-red-400' :
                      record.riskScore > 30 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      Risk: {record.riskScore}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 grid grid-cols-1 gap-1">
                    <p>Time: {new Date(record.timestamp * 1000).toLocaleString()}</p>
                    <p className="truncate">Doctor: {record.doctorWallet}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
