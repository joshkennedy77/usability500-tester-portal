import { useState } from 'react';

export default function TesterSignup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    city: '',
    state: '',
    zip_code: '',
    device_type: [],
    payment_method: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const device_type = checked
        ? [...prev.device_type, value]
        : prev.device_type.filter(item => item !== value);
      return { ...prev, device_type };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    const response = await fetch('/api/add-tester', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        device_type: formData.device_type.join(', ')
      }),
    });

    const result = await response.json();
    if (result.success) {
      setMessage('✅ Signup successful!');
    } else {
      setMessage('❌ Error signing up. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1>User500 - Tester Signup</h1>

        <label>First Name</label>
        <input name="first_name" placeholder="Enter First Name" className="input-field" onChange={handleChange} required />

        <label>Last Name</label>
        <input name="last_name" placeholder="Enter Last Name" className="input-field" onChange={handleChange} required />

        <label>Email Address</label>
        <input name="email" placeholder="Enter Email Address" type="email" onChange={handleChange} className="input-field" required />

        <label>Phone Number</label>
        <input name="phone" placeholder="Enter Phone Number" className="input-field" onChange={handleChange} required />

        <label>Gender (Select one):</label>
        <div className="radio-group">
          {["Male", "Female", "Non-Binary"].map((g) => (
            <label key={g}>
              <input type="radio" name="gender" value={g} onChange={handleChange} required /> {g}
            </label>
          ))}
        </div>

        <label>Age</label>
        <input name="age" placeholder="Enter Age" type="number" className="input-field" onChange={handleChange} />

        <label>City</label>
        <input name="city" placeholder="Enter City" className="input-field" onChange={handleChange} required />

        <label>State</label>
        <input name="state" placeholder="Enter State" className="input-field" onChange={handleChange} required />

        <label>Zip Code</label>
        <input name="zip_code" placeholder="Enter Zip Code" className="input-field" onChange={handleChange} required />

        <label>Device Type:</label>
        <div className="checkbox-group">
          {["Laptop", "Smartphone", "Tablet"].map(device => (
            <label key={device}>
              <input
                type="checkbox"
                name="device_type"
                value={device}
                onChange={handleCheckboxChange}
              /> {device}
            </label>
          ))}
        </div>

        <label>Payment Method</label>
        <select name="payment_method" className="input-field" onChange={handleChange} required>
          <option value="">Select Payment Method</option>
          <option value="PayPal">PayPal</option>
          <option value="Venmo">Venmo</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" className="submit-button">Sign Up</button>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
