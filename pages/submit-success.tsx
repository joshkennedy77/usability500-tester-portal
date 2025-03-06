import React from 'react';

export default function SubmitSuccess() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Success!</h1>
            <p className="text-gray-700 mb-6">
                Thank you for completing your test. Your feedback is incredibly valuable, and we appreciate your time!
            </p>
            <p className="text-gray-700">
                You may close this window now, or return to your <a href="/dashboard" className="text-blue-600 hover:underline">dashboard</a> to see if you have more tests available.
            </p>
        </div>
    );
}

