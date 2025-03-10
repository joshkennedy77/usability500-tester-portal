import { useState } from 'react';

export default function StudyBuilder() {
    const [feedbackType, setFeedbackType] = useState('');

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <h1>User500 - Request a Usability Study</h1>

                <label>First Name</label>
                <input type="text" placeholder="Enter First Name" className="input-field" />

                <label>Last Name</label>
                <input type="text" placeholder="Enter Last Name" className="input-field" />

                <label>Email Address</label>
                <input type="email" placeholder="Enter Email Address" className="input-field" />

                <label>Company Name</label>
                <input type="text" placeholder="Enter Company Name" className="input-field" />

                <label>Test Link (URL)</label>
                <input type="text" placeholder="Enter URL" className="input-field" />

                <label>Study Goals</label>
                <textarea placeholder="Describe your goals" className="input-field"></textarea>

                <label>Type of Feedback You Want</label>
                <div className="radio-group">
                    {["Usability", "A/B Test", "Ease of Use", "Messaging", "Marketing Collateral"].map((type) => (
                        <label key={type}>
                            <input
                                type="radio"
                                name="feedbackType"
                                value={type}
                                checked={feedbackType === type}
                                onChange={() => setFeedbackType(type)}
                            />
                            {type}
                        </label>
                    ))}
                </div>

                <label>Additional Instructions</label>
                <textarea placeholder="Enter any special instructions" className="input-field"></textarea>

                <label className="checkbox-label">
                    <input type="checkbox" /> I have read and agree to the Terms of Service
                </label>

                <button>Submit Study</button>
            </div>
        </div>
    );
}
