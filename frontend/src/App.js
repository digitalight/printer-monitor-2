import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Printer Toner Monitor</h1>
            <Dashboard />
        </div>
    );
}

export default App;
