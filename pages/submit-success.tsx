export default function SubmitSuccess() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Success!</h1>
            <p className="text-lg text-gray-700">Your usability study request has been submitted.</p>
            <p className="text-lg text-gray-700">You’ll receive an email shortly with next steps.</p>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Return to Home
            </a>
        </div>
    );
}
