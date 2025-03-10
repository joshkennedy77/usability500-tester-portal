import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, phone, gender, age, education, city, state, zipCode, industry, jobTitles, deviceType, paymentMethod } = req.body;

        const { data, error } = await supabase.from('testers').insert([
            {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                gender, // Array
                age,
                education,
                city,
                state,
                zip_code: zipCode,
                industry,
                job_titles: jobTitles,
                device_type: deviceType,
                payment_method: paymentMethod,
            },
        ]);

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting tester:', error);
        return res.status(500).json({ error: 'Failed to register tester' });
    }
}
