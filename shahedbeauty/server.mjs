import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

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

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form:', req.body);
    const { name, email, message } = req.body;
    
    console.log('Sending emails from:', process.env.EMAIL_USER);
    
    // Send email to you (business owner)
    await sgMail.send({
      to: process.env.EMAIL_USER,
      from: process.env.EMAIL_USER,
      subject: 'Nieuw Contact Formulier - Shahed Beauty',
      html: `
        <h2>Nieuw bericht van website</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message}</p>
      `
    });

    // Send confirmation to customer
    await sgMail.send({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Bedankt voor uw bericht - Shahed Beauty',
      html: `
        <h2>Bedankt voor uw bericht!</h2>
        <p>Beste ${name},</p>
        <p>We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
        <p>Met vriendelijke groet,<br>Shahed Beauty Team</p>
        
        <hr>
        <p><small>Adres: Zamenhofdreef 4, 3562 JW Utrecht, Nederland<br>
        Telefoon: +31 6 85235657<br>
        WhatsApp: +31 6 86116982</small></p>
      `
    });

    console.log('Contact emails sent successfully');
    res.status(200).json({ message: 'Contact form sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    console.error('SendGrid error details:', error.response?.body);
    res.status(500).json({ 
      error: 'Failed to send contact form', 
      details: error.response?.body?.errors || error.message 
    });
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
