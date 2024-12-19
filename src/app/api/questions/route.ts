import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Question from '../../../../lib/models/Question';


export async function POST(request) {
  try {
    await connectToDatabase();
    const { userId, question } = await request.json();

    if (!userId || !question) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newQuestion = new Question({
      userId,
      question,
    });

    const savedQuestion = await newQuestion.save();

    return NextResponse.json(savedQuestion, { status: 201 });
  } catch (error) {
    console.error('Error saving question:', error);
    return NextResponse.json({ error: 'Failed to save question', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const questions = await Question.find({}).sort({ createdAt: -1 });
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions', details: error.message }, { status: 500 });
  }
}

