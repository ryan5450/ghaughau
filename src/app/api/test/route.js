import connectToDatabase from '../../../../lib/mongodb';



export default async function handler(req, res) {
  try {
    // Ensure this is an API route
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('contacts'); 
    const testData = await collection.find({}).toArray(); // Example: Fetch some data

    res.status(200).json({ message: 'Connected to database', data: testData });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Failed to connect to database' });
  }
}