const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ip: { type: String, required: true, unique: true },
    isColorPrinter: { type: Boolean, default: false },
    tonerLevels: {
        black: { type: Number, default: null },
        cyan: { type: Number, default: null },
        magenta: { type: Number, default: null },
        yellow: { type: Number, default: null }
    },
    isOnline: { type: Boolean, default: false },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Printer', printerSchema);
