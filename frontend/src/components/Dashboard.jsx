import { useEffect, useState } from 'react';
import axios from 'axios';
import PrinterCard from './PrinterCard';
import PrinterForm from './PrinterForm';

const Dashboard = () => {
    const [printers, setPrinters] = useState([]);

    useEffect(() => {
        fetchPrinters();
    }, []);

    const fetchPrinters = async () => {
        const res = await axios.get('/api/printers');
        setPrinters(res.data);
    };

    return (
        <div>
            <PrinterForm onAdd={fetchPrinters} />
            <div className="grid grid-cols-3 gap-4">
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
