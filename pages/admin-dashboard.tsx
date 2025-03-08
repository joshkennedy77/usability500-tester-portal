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
        <div className="page-container">
            <div className="content-wrapper">
                <h1>UX Research Admin Dashboard</h1>

                <label>Enter Study ID</label>
                <input
                    type="text"
                    placeholder="Enter Study ID"
                    value={studyID}
                    onChange={(e) => setStudyID(e.target.value)}
                    className="input-field"
                />

                <button onClick={handleMarkComplete}>✅ Mark Study Complete & Email Results</button>

                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
}