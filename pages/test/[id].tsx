import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function TestDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!videoFile) {
            alert('Please upload your video before submitting.');
            return;
        }

        // In future, we will send this to Supabase Storage
        alert('Video uploaded! (this is placeholder logic)');
        router.push('/submit-success');
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Test Details</h1>
            <p className="text-gray-700 mb-6">
                Please follow the instructions carefully and record your screen as you complete this test.
            </p>

            <div className="p-4 border rounded-lg bg-gray-50">
                <p><strong>Test ID:</strong> {id}</p>
                <p><strong>Title:</strong> Checkout Flow Review (sample)</p>
                <p><strong>Task:</strong> Visit the link below and complete a purchase as if you were a real customer.</p>
                <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Start the Test
                </a>
            </div>

            <div className="mt-6">
                <label className="block font-medium">Upload Your Test Recording</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="mt-2"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Submit Test
            </button>
        </div>
    );
}

