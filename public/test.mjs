// testConnection.js
import connectToDatabase from '../lib/mongodb';

(async () => {
  try {
    await connectToDatabase();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
