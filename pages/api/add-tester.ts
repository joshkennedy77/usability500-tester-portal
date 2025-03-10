import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { first_name, last_name, email, phone, gender, age, city, state, zip_code, device_type, payment_method } = req.body;

        // Convert device_type from array to a comma-separated string
        const formattedDeviceType = Array.isArray(device_type) ? device_type.join(', ') : device_type;

        // Insert into Supabase
        const { data, error } = await supabase
            .from('Tester Panel')
            .insert([{ 
                first_name, last_name, email, phone, gender, age, city, state, zip_code, 
                device_type: formattedDeviceType, payment_method 
            }]);

        if (error) throw error;

        return res.status(200).json({ success: true, message: 'Tester added successfully!' });

    } catch (error) {
        console.error('Error saving tester:', error);
        return res.status(500).json({ success: false, error: 'Failed to save tester data.' });
    }
}