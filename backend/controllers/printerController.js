const Printer = require('../models/Printer');
const { getPrinterStatus } = require('../snmpService');

// Refresh printer status
exports.refreshPrinter = async (req, res) => {
    const { id } = req.params;
    const printer = await Printer.findById(id);
    if (!printer) return res.sendStatus(404);

    const status = await getPrinterStatus(printer.ip);

    printer.isColorPrinter = status.isColorPrinter;
    printer.tonerLevels = status.tonerLevels;
    printer.isOnline = status.isOnline;
    printer.lastUpdated = new Date();

    await printer.save();

    res.json(printer);
};


// Get all printers
exports.getPrinters = async (req, res) => {
    const printers = await Printer.find({});
    res.json(printers);
};

// Add a new printer
exports.addPrinter = async (req, res) => {
    const { name, ip } = req.body;
    const newPrinter = await Printer.create({ name, ip });
    res.json(newPrinter);
};

// Delete a printer
exports.deletePrinter = async (req, res) => {
    const { id } = req.params;
    await Printer.findByIdAndDelete(id);
    res.sendStatus(204);
};
