import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { tourEnquirySchema, buildEnquiryEmail } from '@/lib/tourEnquiry';
import { CONTACT_EMAIL } from '@/lib/planner';

// Nodemailer needs Node APIs — this route can't run on the edge runtime.
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    // Re-validate server-side — the client schema is a convenience, not a guarantee.
    const parsed = tourEnquirySchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            {
                error: 'Some details are missing or invalid. Please review the form.',
                fields: parsed.error.flatten().fieldErrors,
            },
            { status: 400 }
        );
    }

    const enquiry = parsed.data;
    const { subject, text, html } = buildEnquiryEmail(enquiry);

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    // Without SMTP credentials there is nothing to send through. Log the
    // enquiry so it isn't silently lost in local dev, and say so plainly
    // rather than throwing a 500 the visitor can't act on.
    if (!user || !pass) {
        console.warn('[tour-enquiry] EMAIL_USER / EMAIL_PASS not configured — enquiry not emailed.');
        console.info(text);
        return NextResponse.json(
            {
                error: 'Our enquiry mailbox is not reachable right now. Please continue on WhatsApp and we will reply straight away.',
            },
            { status: 503 }
        );
    }

    try {
        // Custom-domain mailboxes (Hostinger, cPanel) need an explicit host;
        // Gmail/Outlook work off nodemailer's `service` shortcut. Support both.
        const host = process.env.EMAIL_HOST;
        const transporter = nodemailer.createTransport(
            host
                ? {
                    host,
                    port: Number(process.env.EMAIL_PORT) || 587,
                    // 465 is implicit TLS; 587 upgrades via STARTTLS.
                    secure: (Number(process.env.EMAIL_PORT) || 587) === 465,
                    auth: { user, pass },
                }
                : {
                    service: process.env.EMAIL_SERVICE || 'gmail',
                    auth: { user, pass },
                }
        );

        await transporter.sendMail({
            from: `"Guide India Tours Website" <${user}>`,
            to: CONTACT_EMAIL,
            replyTo: `"${enquiry.fullName}" <${enquiry.email}>`,
            subject,
            text,
            html,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('[tour-enquiry] Email send error:', error);
        return NextResponse.json(
            { error: 'We could not send your enquiry. Please try again, or continue on WhatsApp.' },
            { status: 500 }
        );
    }
}
