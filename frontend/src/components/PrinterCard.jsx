import React from 'react';
import axios from 'axios';

const PrinterCard = ({ printer, onRefresh, onDelete }) => {
    const statusColor = printer.isOnline ? 'bg-green-500' : 'bg-red-500';

    // Function to handle deleting a printer
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${printer.name}?`)) {
            await axios.delete(`/api/printers/${printer._id}`);
            onDelete(); // Refresh the parent component's data
        }
    };

    // Function to render a colored progress bar
    const renderProgressBar = (label, percentage, color) => (
        <div className="mb-2">
            <div className="flex justify-between mb-1">
                <span>{label}</span>
                <span>{percentage ?? 'Unknown'}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                    className={`h-4 rounded-full ${color}`} 
                    style={{ width: `${percentage ?? 0}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="border p-4 bg-white shadow-md rounded-md">
            <div className="flex items-center mb-2">
                <span className={`w-4 h-4 rounded-full ${statusColor} mr-2`}></span>
                <h2 className="font-bold flex-1">{printer.name}</h2>
                
                {/* Delete Button */}
                <button 
                    onClick={handleDelete} 
                    className="text-red-500 hover:text-red-700 ml-4"
                    title="Delete Printer"
                >
                    🗑️
                </button>
            </div>

            <p>IP: {printer.ip}</p>
            <p>Last Updated: {new Date(printer.lastUpdated).toLocaleString()}</p>

            <div className="mt-2">
                <h3 className="font-semibold mb-2">Toner Levels:</h3>

                {/* Render progress bars for all available toner levels */}
                {renderProgressBar('Black', printer.tonerLevels?.black, 'bg-black')}
                
                {printer.isColorPrinter && (
                    <>
                        {renderProgressBar('Cyan', printer.tonerLevels?.cyan, 'bg-cyan-500')}
                        {renderProgressBar('Magenta', printer.tonerLevels?.magenta, 'bg-pink-500')}
                        {renderProgressBar('Yellow', printer.tonerLevels?.yellow, 'bg-yellow-500')}
                    </>
                )}
            </div>

            <button 
                onClick={() => onRefresh(printer._id)} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Refresh
            </button>
        </div>
    );
};

export default PrinterCard;
