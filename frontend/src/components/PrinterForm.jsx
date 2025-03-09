import { useState } from 'react';
import axios from 'axios';

const PrinterForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/printers', { name, ip });
        onAdd(res.data);
        setName('');
        setIp('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2"/>
            <input type="text" placeholder="IP Address" value={ip} onChange={(e) => setIp(e.target.value)} className="border p-2"/>
            <button type="submit" className="bg-blue-500 text-white p-2">Add Printer</button>
        </form>
    );
};

export default PrinterForm;