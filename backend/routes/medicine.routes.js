// routes/medicine.routes.js
const express = require('express');
const medicineController = require('../controllers/medicine.controller');
// const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router
  .route('/')
  .post(medicineController.createMedicine)
  .get(medicineController.getMedicines);

router
  .route('/:id')
  .get(medicineController.getMedicineById)
  .put(medicineController.updateMedicine)
  .delete(medicineController.deleteMedicine);

router.post('/:id/log', medicineController.logAdherence);

module.exports = router;
