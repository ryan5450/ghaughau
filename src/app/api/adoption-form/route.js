// src/app/api/adoption-form/route.js
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import connectToDatabase from '../../../../lib/mongodb';
import AdoptionForm from '../../../../lib/models/AdoptionForm';
import nodemailer from 'nodemailer';

export async function POST(req) {
  await connectToDatabase();

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'You must be logged in to submit an adoption request.' },
        { status: 401 }
      );
    }

    const body = await req.json();

    const existingSubmission = await AdoptionForm.findOne({
      petId: body.petId,
      userId,
    });

    if (existingSubmission) {
      return NextResponse.json(
        { success: false, message: 'You have already submitted an adoption request for this pet. Please wait for approval.' },
        { status: 400 }
      );
    }

    const adoptionForm = new AdoptionForm({ ...body, userId });
    await adoptionForm.save();

    return NextResponse.json({ success: true, data: adoptionForm }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const petId = searchParams.get('petId');
    const userId = searchParams.get('userId');

    const query = {};
    if (petId) query.petId = petId;
    if (userId) query.userId = userId;

    const adoptionForms = await AdoptionForm.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: adoptionForms });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectToDatabase();

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'ID and status are required.' },
        { status: 400 }
      );
    }

    const updatedApplication = await AdoptionForm.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { success: false, message: 'Application not found.' },
        { status: 404 }
      );
    }

    // After successfully updating the status, send the email
    const sendEmail = async (recipient, status) => {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail', // or your email provider
          auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app password
          },
        });
    
        const subject = `Adoption Application ${status === 'approved' ? 'Approved' : 'Disapproved'}`;
        const bodyColor = status === 'approved' ? 'green' : 'red';

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: recipient,
          subject: subject,
          html: `
            <h2 style="color: ${bodyColor};">Your application has been ${status}!</h2>
            <p>We want to extend our deepest gratitude to you for choosing to adopt and giving them a loving forever home. </p>
          `,

        };
    
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed.');
      }
    };
    await sendEmail(updatedApplication.email, status);

    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully.',
      data: updatedApplication,
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  await connectToDatabase();

  try {
    const { id } = await req.json();

    const application = await AdoptionForm.findByIdAndDelete(id);
    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Application deleted successfully.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

