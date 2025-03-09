const express = require('express');
const { getPrinters, addPrinter, deletePrinter, refreshPrinter } = require('../controllers/printerController');
const router = express.Router();

router.get('/printers', getPrinters);
router.post('/printers', addPrinter);
router.delete('/printers/:id', deletePrinter);
router.get('/printers/refresh/:id', refreshPrinter);

module.exports = router;