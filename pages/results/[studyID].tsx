import { useRouter } from 'next/router';
import React from 'react';

// Fake placeholder data (this will be replaced by Supabase lookup later)
const fakeStudy = {
    id: 'abcd1234',
    title: 'Homepage Usability Test',
    completedDate: 'March 2, 2025',
    resultsFolderLink: 'https://drive.google.com/fake-folder-link',
    summaryReportLink: 'https://drive.google.com/fake-report-link',
};

export default function StudyResults() {
    const router = useRouter();
    const { studyID } = router.query;

    // Normally, this would fetch real data from Supabase using `studyID`
    const study = studyID === fakeStudy.id ? fakeStudy : null;

    if (!study) {
        return <p className="text-center text-red-500 mt-10">Study not found.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Study Results: {study.title}</h1>
            <p className="text-gray-500 mb-4">Completed on: {study.completedDate}</p>

            <div className="space-y-4 border p-4 rounded bg-gray-50">
                <p>
                    📂 <strong>Results Folder:</strong>{' '}
                    <a href={study.resultsFolderLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View All Files
                    </a>
                </p>
                <p>
                    📄 <strong>Summary Report:</strong>{' '}
                    <a href={study.summaryReportLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Download Report (PDF)
                    </a>
                </p>
            </div>

            <div className="mt-6 text-center">
                <a href="/" className="text-blue-600 hover:underline">Back to Home</a>
            </div>
        </div>
    );
}

