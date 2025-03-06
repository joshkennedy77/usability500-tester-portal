import React, { useState } from 'react';

export default function StudyBuilder() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        testLink: '',
        feedbackType: [],
        audience: '',
        studyGoals: '',
        specialInstructions: '',
        package: 'Single',
        paymentMethod: 'Stripe',
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'feedbackType') {
            setFormData((prev) => ({
                ...prev,
                feedbackType: checked
                    ? [...prev.feedbackType, value]
                    : prev.feedbackType.filter((t) => t !== value)
            }));
        } else if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/submit-study', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success && result.checkoutUrl) {
                window.location.href = result.checkoutUrl;  // Redirect to Stripe Checkout
            } else {
                alert('There was an issue processing your request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting study request:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Build Your Usability Study</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                {['fullName', 'email', 'phone', 'company', 'testLink', 'audience', 'studyGoals', 'specialInstructions'].map((field) => (
                    <div key={field}>
                        <label className="block font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required={['fullName', 'email', 'testLink', 'audience', 'studyGoals'].includes(field)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                ))}

                <div>
                    <label className="block font-medium">Type of Feedback You Want</label>
                    {['Usability', 'A/B Test', 'Ease of Use', 'Messaging', 'Marketing Collateral'].map((type) => (
                        <label key={type} className="block">
                            <input
                                type="checkbox"
                                name="feedbackType"
                                value={type}
                                checked={formData.feedbackType.includes(type)}
                                onChange={handleChange}
                            />{' '}
                            {type}
                        </label>
                    ))}
                </div>

                <div>
                    <label className="block font-medium">Choose Your Package</label>
                    <select name="package" value={formData.package} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="Single">Single Study - $500</option>
                        <option value="Bundle">5 Study Bundle - $2000</option>
                        <option value="Hour">1 Hour of Help - $100</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium">Preferred Payment Method</label>
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="Stripe">Pay with Stripe (Credit/Debit)</option>
                        <option value="Venmo">Pay with Venmo</option>
                        <option value="PayPal">Pay with PayPal</option>
                    </select>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-2">Terms of Service</h2>
                    <div className="text-sm bg-gray-100 p-3 rounded overflow-y-auto h-40 border">
                        <p><strong>Terms of Service - Usability500</strong></p>
                        <p>By submitting this form and purchasing a study, you agree to the following:</p>
                        <ul className="list-disc pl-5">
                            <li>Payment must be received before your study begins.</li>
                            <li>Once testers begin your study, payments are non-refundable.</li>
                            <li>Usability500 will deliver 5 tester videos, transcripts, and a final insights report within 72 hours of study start.</li>
                            <li>Usability500 is not responsible for test content, legal compliance of test materials, or tester opinions.</li>
                            <li>Usability500 reserves the right to decline or cancel any study deemed inappropriate or unsafe for testers.</li>
                        </ul>
                        <p>Questions? Contact: support@usability500.com</p>
                    </div>
                    <label>
                        <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required />{' '}
                        I have read and agree to the Terms of Service.
                    </label>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit Study Request
                </button>
            </form>
        </div>
    );
}
