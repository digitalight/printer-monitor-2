import { useEffect, useState } from 'react';
import axios from 'axios';
import PrinterCard from './PrinterCard';
import PrinterForm from './PrinterForm';

const Dashboard = () => {
    const [printers, setPrinters] = useState([]);

    useEffect(() => {
        fetchPrinters();
    }, []);

    // Fetch all printers from the API
    const fetchPrinters = async () => {
        try {
            const res = await axios.get('/api/printers');
            setPrinters(res.data);
        } catch (error) {
            console.error('Failed to fetch printers:', error);
        }
    };

    // Add a new printer through the PrinterForm component
    const handleAddPrinter = async (printer) => {
        try {
            await axios.post('/api/printers', printer);
            fetchPrinters();
        } catch (error) {
            console.error('Failed to add printer:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Printer Toner Monitor</h1>

            {/* Add Printer Form */}
            <PrinterForm onAdd={handleAddPrinter} />

            {/* Printer Cards */}
            <div className="grid grid-cols-3 gap-4 mt-4">
                {printers.map((printer) => (
                    <PrinterCard 
                        key={printer._id} 
                        printer={printer} 
                        onRefresh={fetchPrinters} 
                        onDelete={fetchPrinters} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
