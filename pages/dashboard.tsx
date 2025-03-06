import React from 'react';

const fakeTests = [
    { id: 'test-123', title: 'Homepage Usability Test', dueDate: 'March 10, 2025' },
    { id: 'test-456', title: 'Checkout Flow Review', dueDate: 'March 12, 2025' },
];

export default function Dashboard() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Tester Dashboard</h1>
            <p className="mb-6 text-gray-700">Welcome! Here are your assigned tests:</p>
            <ul className="space-y-4">
                {fakeTests.map((test) => (
                    <li key={test.id} className="border p-4 rounded-lg shadow-sm">
                        <h2 className="font-semibold text-lg">{test.title}</h2>
                        <p className="text-sm text-gray-500">Due: {test.dueDate}</p>
                        <a
                            href={`/test/${test.id}`}
                            className="inline-block mt-2 text-blue-600 hover:underline"
                        >
                            Start Test
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

