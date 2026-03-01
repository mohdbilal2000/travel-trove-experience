import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        // In production, integrate with email service (Mailchimp, SendGrid, etc.)
        // For now, log and return success
        console.log(`Newsletter signup: ${email}`);

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for subscribing! You\'ll receive our latest travel stories and exclusive offers.',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Newsletter signup error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        );
    }
}
