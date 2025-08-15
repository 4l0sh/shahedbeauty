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
    console.log('Full appointment data object:', JSON.stringify(req.body, null, 2));
    const appointmentData = req.body;
    console.log('Attempting to save to MongoDB...');
    
    // Debug: Check all possible field variations
    console.log('All possible field names:', {
      // Name variations
      name: appointmentData.name,
      customerName: appointmentData.customerName,
      fullName: appointmentData.fullName,
      // Email variations  
      email: appointmentData.email,
      customerEmail: appointmentData.customerEmail,
      userEmail: appointmentData.userEmail,
      // Phone variations
      phone: appointmentData.phone,
      phoneNumber: appointmentData.phoneNumber,
      customerPhone: appointmentData.customerPhone,
      // Message variations
      message: appointmentData.message,
      notes: appointmentData.notes,
      comments: appointmentData.comments,
      opmerkingen: appointmentData.opmerkingen
    });
    console.log('Business email:', process.env.EMAIL_USER);
    
    const result = await db.collection('Afspraken').insertOne(appointmentData);
    console.log('Successfully saved appointment with ID:', result.insertedId);
    
    console.log('Sending appointment emails from:', process.env.EMAIL_USER);
    
    // Get customer data (handle different possible field names)
    const customerEmail = appointmentData.customerEmail || appointmentData.email || appointmentData.userEmail || appointmentData.contactEmail || appointmentData.emailAddress;
    const customerName = appointmentData.name || appointmentData.customerName || appointmentData.fullName;
    const customerPhone = appointmentData.phone || appointmentData.phoneNumber || appointmentData.customerPhone;
    const customerMessage = appointmentData.message || appointmentData.notes || appointmentData.comments || appointmentData.opmerkingen;
    
    if (!customerEmail) {
      console.error('No customer email found in appointment data');
      // Still save appointment but don't send customer email
      res.status(201).json({ 
        message: 'Appointment created successfully (no customer email provided)', 
        appointmentId: result.insertedId 
      });
      return;
    }
    
    console.log('Customer email found:', customerEmail);
    
    // Send appointment notification to business owner
    await sgMail.send({
      to: process.env.EMAIL_USER,
      from: {
        email: process.env.EMAIL_USER,
        name: 'Shahed Beauty Website'
      },
      replyTo: customerEmail, // Allow direct reply to customer
      subject: 'Nieuwe Afspraak - Shahed Beauty',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Nieuwe Afspraak</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #db2777;">Nieuwe Afspraak Ontvangen</h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #db2777; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #db2777;">Klantgegevens:</h3>
              <p><strong>Naam:</strong> ${customerName || 'Niet opgegeven'}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Telefoon:</strong> ${customerPhone || 'Niet opgegeven'}</p>
            </div>
            
            <div style="background: #f0f8ff; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #db2777;">Afspraakdetails:</h3>
              <p><strong>Datum:</strong> ${appointmentData.date}</p>
              <p><strong>Tijd:</strong> ${appointmentData.time}</p>
              <p><strong>Pakket:</strong> ${appointmentData.package}</p>
              ${appointmentData.areas ? `<p><strong>Behandelingsgebieden:</strong> ${appointmentData.areas.join(', ')}</p>` : '<p><strong>Behandeling:</strong> Volledig lichaam</p>'}
              ${customerMessage ? `<p><strong>Opmerkingen:</strong> ${customerMessage}</p>` : ''}
            </div>
            
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              Deze afspraak is gemaakt via shahedbeauty.com<br>
              Afspraak ID: ${result.insertedId}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `Nieuwe Afspraak Ontvangen\n\nKlantgegevens:\nNaam: ${customerName || 'Niet opgegeven'}\nEmail: ${customerEmail}\nTelefoon: ${customerPhone || 'Niet opgegeven'}\n\nAfspraakdetails:\nDatum: ${appointmentData.date}\nTijd: ${appointmentData.time}\nPakket: ${appointmentData.package}\nBehandelingsgebieden: ${appointmentData.areas ? appointmentData.areas.join(', ') : 'Volledig lichaam'}\n${customerMessage ? `Opmerkingen: ${customerMessage}\n` : ''}\nAfspraak ID: ${result.insertedId}`
    });

    // Send confirmation email to customer
    await sgMail.send({
      to: customerEmail,
      from: {
        email: process.env.EMAIL_USER,
        name: 'Shahed Beauty'
      },
      subject: 'Afspraak Bevestiging - Shahed Beauty',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Afspraak Bevestiging</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #db2777;">Bedankt voor uw afspraak!</h2>
            <p>Beste ${customerName || 'klant'},</p>
            <p>Uw afspraak is succesvol geboekt. Hieronder vindt u de details van uw afspraak:</p>
            
            <div style="background: linear-gradient(135deg, #db2777, #f59e0b); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0;">Uw Afspraakdetails</h3>
              <p style="margin: 5px 0;"><strong>📅 Datum:</strong> ${appointmentData.date}</p>
              <p style="margin: 5px 0;"><strong>🕐 Tijd:</strong> ${appointmentData.time}</p>
              <p style="margin: 5px 0;"><strong>💎 Pakket:</strong> ${appointmentData.package}</p>
              <p style="margin: 5px 0;"><strong>📍 Locatie:</strong> Zamenhofdreef 4, 3562 JW Utrecht</p>
            </div>
            
            ${appointmentData.areas ? `
            <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #db2777;">Behandelingsgebieden:</h4>
              <p style="margin: 0;">${appointmentData.areas.join(', ')}</p>
            </div>
            ` : ''}
            
            <div style="background: #fff8dc; padding: 15px; border-radius: 5px; border: 1px solid #f59e0b; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #f59e0b;">⚠️ Belangrijke informatie:</h4>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Kom 15 minuten voor uw afspraak</li>
                <li>Zorg dat de huid schoon en droog is</li>
                <li>Vermijd zonnen 2 weken voor behandeling</li>
                <li>Bij vragen, neem gerust contact op</li>
              </ul>
            </div>
            
            <p>We kijken ernaar uit u te zien!</p>
            <p>Met vriendelijke groet,<br>
            <strong>Shahed Beauty Team</strong></p>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <div style="font-size: 12px; color: #666;">
              <p><strong>Shahed Beauty</strong><br>
              📍 Zamenhofdreef 4, 3562 JW Utrecht, Nederland<br>
              📞 Telefoon: <a href="tel:+31685235657" style="color: #db2777;">+31 6 85235657</a><br>
              💬 WhatsApp: <a href="https://wa.me/31686116982" style="color: #db2777;">+31 6 86116982</a></p>
              <p style="margin-top: 15px;">Afspraak referentie: ${result.insertedId}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Bedankt voor uw afspraak!\n\nBeste ${customerName || 'klant'},\n\nUw afspraak is succesvol geboekt:\n\nDatum: ${appointmentData.date}\nTijd: ${appointmentData.time}\nPakket: ${appointmentData.package}\nLocatie: Zamenhofdreef 4, 3562 JW Utrecht\n\n${appointmentData.areas ? `Behandelingsgebieden: ${appointmentData.areas.join(', ')}\n\n` : ''}Belangrijke informatie:\n- Kom 15 minuten voor uw afspraak\n- Zorg dat de huid schoon en droog is\n- Vermijd zonnen 2 weken voor behandeling\n- Bij vragen, neem gerust contact op\n\nWe kijken ernaar uit u te zien!\n\nMet vriendelijke groet,\nShahed Beauty Team\n\nShahed Beauty\nZamenhofdreef 4, 3562 JW Utrecht, Nederland\nTelefoon: +31 6 85235657\nWhatsApp: +31 6 86116982\n\nAfspraak referentie: ${result.insertedId}`
    });

    console.log('Appointment emails sent successfully');
    
    res.status(201).json({ message: 'Appointment created successfully', appointmentId: result.insertedId });
  } catch (error) {
    console.error('Error creating appointment:', error);
    console.error('SendGrid error details:', error.response?.body);
    res.status(500).json({ 
      error: 'Failed to create appointment', 
      details: error.response?.body?.errors || error.message 
    });
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
      from: {
        email: process.env.EMAIL_USER,
        name: 'Shahed Beauty Website'
      },
      replyTo: email, // Allow direct reply to customer
      subject: 'Nieuw Contact Formulier - Shahed Beauty',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Contact Form</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #db2777;">Nieuw bericht van website</h2>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Bericht:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #db2777;">
              ${message}
            </div>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              Dit bericht is verzonden via het contactformulier op shahedbeauty.com
            </p>
          </div>
        </body>
        </html>
      `,
      text: `Nieuw bericht van website\n\nNaam: ${name}\nEmail: ${email}\nBericht: ${message}` // Always include text version
    });

    // Send confirmation to customer
    await sgMail.send({
      to: email,
      from: {
        email: process.env.EMAIL_USER,
        name: 'Shahed Beauty'
      },
      subject: 'Bedankt voor uw bericht - Shahed Beauty',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Bevestiging</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #db2777;">Bedankt voor uw bericht!</h2>
            <p>Beste ${name},</p>
            <p>We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
            
            <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #db2777;">Uw bericht:</h3>
              <p style="margin: 0;">${message}</p>
            </div>
            
            <p>Met vriendelijke groet,<br>
            <strong>Shahed Beauty Team</strong></p>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <div style="font-size: 12px; color: #666;">
              <p><strong>Shahed Beauty</strong><br>
              Zamenhofdreef 4, 3562 JW Utrecht, Nederland<br>
              Telefoon: <a href="tel:+31685235657">+31 6 85235657</a><br>
              WhatsApp: <a href="https://wa.me/31686116982">+31 6 86116982</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Bedankt voor uw bericht!\n\nBeste ${name},\n\nWe hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.\n\nUw bericht: ${message}\n\nMet vriendelijke groet,\nShahed Beauty Team\n\nShahed Beauty\nZamenhofdreef 4, 3562 JW Utrecht, Nederland\nTelefoon: +31 6 85235657\nWhatsApp: +31 6 86116982`
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
