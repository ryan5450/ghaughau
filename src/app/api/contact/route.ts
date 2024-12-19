import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from "../../../../lib/mongodb"
import ContactSchema from "../../../../lib/models/ContactFormSchema"


const ContactModel = mongoose.models.contacts || mongoose.model('contacts', ContactSchema);

export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await ContactModel.find({}).sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts', details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { userName, userEmail, userMessage } = body;

    if (!userName || !userEmail || !userMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newContact = new ContactModel({
      userName,
      userEmail,
      userMessage,
    });

    const savedContact = await newContact.save();

    return NextResponse.json(savedContact, { status: 201 });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ error: 'Failed to save contact', details: error.message }, { status: 500 });
  }
}

