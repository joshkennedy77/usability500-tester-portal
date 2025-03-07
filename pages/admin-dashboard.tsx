import { useState } from 'react';

export default function AdminDashboard() {
    const [studyID, setStudyID] = useState('');
    const [message, setMessage] = useState('');

    const handleMarkComplete = async () => {
        setMessage('Working...');
        const response = await fetch('/api/mark-study-complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studyID }),
        });

        if (response.ok) {
            setMessage('✅ Study marked complete & email sent!');
        } else {
            const error = await response.json();
            setMessage(`❌ Failed: ${error.error}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
                <input
                    type="text"
                    placeholder="Enter Study ID"
                    value={studyID}
                    onChange={(e) => setStudyID(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleMarkComplete}
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
                >
                    ✅ Mark Study Complete & Email Results
                </button>
                {message && (
                    <div className="mt-4 p-2 rounded bg-gray-50 text-gray-700 border border-gray-300">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
