import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from "../../../../../lib/mongodb";
import ContactSchema from "../../../../../lib/models/ContactFormSchema";
import mongoose from 'mongoose';

const ContactModel = mongoose.models.contacts || mongoose.model('contacts', ContactSchema);

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { contactId, replyMessage } = await request.json();

    if (!contactId || !replyMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const contact = await ContactModel.findById(contactId);
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contact.userEmail,
      subject: `Reply to Your Contact Message`,
      text: `Your Message:\n${contact.userMessage}\n\nOur Reply:\n${replyMessage}`,
      html: `
        <div>
          <h1>Your Message/Query:</h1>
          <h2>${contact.userMessage}</h2>
          <h1>Our Reply:</h1>
          <h2>${replyMessage}</h2>
        </div>
      `,
    };
    

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Reply sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending reply:', error);
    return NextResponse.json({ error: 'Failed to send reply', details: error.message }, { status: 500 });
  }
}
