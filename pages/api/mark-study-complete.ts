import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Email Transporter - You need to add these to your .env.local
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST!,
    port: Number(process.env.EMAIL_SMTP_PORT!),
    secure: true, // Usually true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SMTP_USER!,
        pass: process.env.EMAIL_SMTP_PASS!
    }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { studyID } = req.body;

    if (!studyID) {
        return res.status(400).json({ error: 'Missing studyID' });
    }

    // 1️⃣ Update Study Status to Complete
    const { error: updateError } = await supabase
        .from('studies')
        .update({ status: 'Complete' })
        .eq('id', studyID);

    if (updateError) {
        console.error('Error updating study:', updateError);
        return res.status(500).json({ error: 'Failed to update study' });
    }

    // 2️⃣ Fetch Study Details to Get Customer Email
    const { data: study, error: fetchError } = await supabase
        .from('studies')
        .select('id, customerEmail, customerName')
        .eq('id', studyID)
        .single();

    if (fetchError || !study) {
        return res.status(404).json({ error: 'Study not found' });
    }

    // 3️⃣ Build the Magic Link
    const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/results/${studyID}`;

    // 4️⃣ Send Email with Magic Link
    const emailOptions = {
        from: '"Usability500 Team" <support@usability500.com>',
        to: study.customerEmail,
        subject: 'Your Usability Study Results are Ready! 🎉',
        html: `
            <p>Hi ${study.customerName},</p>
            <p>Your usability study is complete! You can view your results at the link below:</p>
            <p><a href="${magicLink}">${magicLink}</a></p>
            <p>Thank you for using Usability500!</p>
        `
    };

    try {
        await transporter.sendMail(emailOptions);
    } catch (emailError) {
        console.error('Failed to send email:', emailError);
        return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, message: 'Study marked complete and email sent!' });
}
