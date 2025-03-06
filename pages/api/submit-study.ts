import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Create Supabase Client (placeholder - will fill this after 5pm Supabase setup)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Create Stripe Instance (uses placeholder env - you will need to set STRIPE_SECRET_KEY in your .env.local)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            fullName, email, phone, company, testLink,
            feedbackType, audience, studyGoals,
            specialInstructions, package: selectedPackage
        } = req.body;

        // Save study to Supabase (initially as Pending Payment)
        const { data, error } = await supabase
            .from('studies')
            .insert([{
                full_name: fullName,
                email,
                phone,
                company,
                test_link: testLink,
                feedback_type: feedbackType,
                audience,
                study_goals: studyGoals,
                special_instructions: specialInstructions,
                package: selectedPackage,
                payment_status: 'Pending'
            }])
            .select()
            .single();

        if (error) throw error;

        // Map the package to Stripe price (in cents)
        const priceMap = {
            'Single': 50000,
            'Bundle': 200000,
            'Hour': 10000
        };

        // Create Stripe Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: `Usability Study - ${selectedPackage} Package` },
                        unit_amount: priceMap[selectedPackage],
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                study_id: data.id
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/submit-success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/studybuilder?canceled=true`,
        });

        // Update the study record with Stripe session ID
        await supabase
            .from('studies')
            .update({ stripe_session_id: checkoutSession.id })
            .eq('id', data.id);

        // Return the checkout URL for redirect
        return res.status(200).json({ success: true, checkoutUrl: checkoutSession.url });

    } catch (error) {
        console.error('Error in submit-study.ts:', error);
        return res.status(500).json({ success: false, error: 'Failed to process your study request' });
    }
}

