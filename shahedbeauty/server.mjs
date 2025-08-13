import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

//middleware
app.use(cors());
app.use(express.json());

//mongodb connection
console.log('Starting server...');

const mongoUri = process.env.MONGOURI;
console.log('Attempting to connect to MongoDB...');

let db;


// Use the original URI with proper SSL
MongoClient.connect(mongoUri)
  .then((client) => {
    console.log('MongoDB connection successful!');
    db = client.db('ShahedBeautyDB');
    console.log(`Connected to Database : ${db.databaseName}`);


    //routes
 
//submit appointment
app.post('/api/appointments', async (req, res) => {
  try {
    console.log('Received appointment request:', req.body);
    const appointmentData = req.body;
    console.log('Attempting to save to MongoDB...');
    
    const result = await db.collection('Afspraken').insertOne(appointmentData);
    console.log('Successfully saved appointment with ID:', result.insertedId);
    
    res.status(201).json({ message: 'Appointment created successfully', appointmentId: result.insertedId });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Start the server after database connection is established
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
  })
  .catch((err) => {
    console.error('Error connecting to database : ', err);
    console.error('Full error details:', err.message);
  });
