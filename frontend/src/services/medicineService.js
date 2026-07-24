import apiClient from './apiClient';

export const medicineService = {
  getMedicines: async () => {
    return await apiClient.get('/medicines');
  },
  
  getMedicineById: async (id) => {
    return await apiClient.get(`/medicines/${id}`);
  },

  addMedicine: async (medicineData) => {
    return await apiClient.post('/medicines', medicineData);
  },

  updateMedicine: async (id, updateData) => {
    return await apiClient.put(`/medicines/${id}`, updateData);
  },

  deleteMedicine: async (id) => {
    return await apiClient.delete(`/medicines/${id}`);
  }
};
