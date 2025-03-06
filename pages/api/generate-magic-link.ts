import { createClient } from '@supabase/supabase-js';

// Supabase Client (same as other API files - works after you add env vars)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { studyID } = req.body;

    if (!studyID) {
        return res.status(400).json({ error: 'Missing studyID' });
    }

    try {
        // Fetch study to confirm it exists
        const { data: study, error } = await supabase
            .from('studies')
            .select('*')
            .eq('id', studyID)
            .single();

        if (error || !study) {
            return res.status(404).json({ error: 'Study not found' });
        }

        // Build the magic link
        const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/results/${studyID}`;

        // (Optional Future Step) — You could automatically email this link to the customer here.

        return res.status(200).json({ success: true, magicLink });

    } catch (error) {
        console.error('Error generating magic link:', error);
        return res.status(500).json({ success: false, error: 'Failed to generate magic link' });
    }
}

