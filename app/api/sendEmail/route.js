import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { email, subject, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: subject,
            text: `Message: ${message}\nFrom: ${email}`,
            replyTo: email, 
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Failed to Send Email, error: ${error}` }, { status: 500 });
    }
}