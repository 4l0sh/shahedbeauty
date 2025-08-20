import express from 'express';
import cors from 'cors';
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

// MongoDB connection removed

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//routes

//submit appointment
app.post('/api/appointments', async (req, res) => {
  try {
    console.log('Received appointment request:', req.body);
    console.log('Full appointment data object:', JSON.stringify(req.body, null, 2));
    const appointmentData = req.body;

    // Normalize incoming fields
    const customerEmail = appointmentData.customerEmail || appointmentData.email || appointmentData.userEmail || appointmentData.contactEmail || appointmentData.emailAddress;
    const customerName = appointmentData.name || appointmentData.customerName || appointmentData.fullName;
    const customerPhone = appointmentData.phone || appointmentData.phoneNumber || appointmentData.customerPhone;
    const customerMessage = appointmentData.message || appointmentData.notes || appointmentData.comments || appointmentData.opmerkingen;
    const packageName = appointmentData.package || appointmentData.pkg;
    let appointmentDate = appointmentData.date;
    // Accept both ISO and plain date strings
    if (appointmentDate) {
      if (typeof appointmentDate === 'string') {
        // Try to parse ISO string
        const parsedDate = new Date(appointmentDate);
        if (!isNaN(parsedDate.getTime())) {
          appointmentDate = parsedDate.toLocaleDateString('nl-NL');
        } else {
          appointmentDate = appointmentDate; // fallback to string
        }
      }
    }
    const appointmentTime = appointmentData.time;
    const appointmentAreas = appointmentData.areas || [];

    // Generate a random appointment ID (since MongoDB is removed)
    const appointmentId = Math.random().toString(36).substr(2, 9);

    if (!customerEmail) {
      console.error('No customer email found in appointment data');
      res.status(201).json({ 
        message: 'Appointment created successfully (no customer email provided)', 
        appointmentId
      });
      return;
    }

    // Send appointment notification to business owner
    await sgMail.send({
      to: process.env.EMAIL_USER,
      from: {
        email: process.env.EMAIL_USER,
        name: 'Shahed Beauty Website'
      },
      replyTo: customerEmail,
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
              <p><strong>Datum:</strong> ${appointmentDate}</p>
              <p><strong>Tijd:</strong> ${appointmentTime}</p>
              <p><strong>Pakket:</strong> ${packageName}</p>
              ${appointmentAreas.length ? `<p><strong>Behandelingsgebieden:</strong> ${appointmentAreas.join(', ')}</p>` : '<p><strong>Behandeling:</strong> Volledig lichaam</p>'}
              ${customerMessage ? `<p><strong>Opmerkingen:</strong> ${customerMessage}</p>` : ''}
            </div>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              Deze afspraak is gemaakt via shahedbeauty.com<br>
              Afspraak ID: ${appointmentId}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `Nieuwe Afspraak Ontvangen\n\nKlantgegevens:\nNaam: ${customerName || 'Niet opgegeven'}\nEmail: ${customerEmail}\nTelefoon: ${customerPhone || 'Niet opgegeven'}\n\nAfspraakdetails:\nDatum: ${appointmentDate}\nTijd: ${appointmentTime}\nPakket: ${packageName}\nBehandelingsgebieden: ${appointmentAreas.length ? appointmentAreas.join(', ') : 'Volledig lichaam'}\n${customerMessage ? `Opmerkingen: ${customerMessage}\n` : ''}\nAfspraak ID: ${appointmentId}`
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
              <p style="margin: 5px 0;"><strong>📅 Datum:</strong> ${appointmentDate}</p>
              <p style="margin: 5px 0;"><strong>🕐 Tijd:</strong> ${appointmentTime}</p>
              <p style="margin: 5px 0;"><strong>💎 Pakket:</strong> ${packageName}</p>
              <p style="margin: 5px 0;"><strong>📍 Locatie:</strong> Zamenhofdreef 4, 3562 JW Utrecht</p>
            </div>
            ${appointmentAreas.length ? `
            <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #db2777;">Behandelingsgebieden:</h4>
              <p style="margin: 0;">${appointmentAreas.join(', ')}</p>
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
              <p style="margin-top: 15px;">Afspraak referentie: ${appointmentId}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Bedankt voor uw afspraak!\n\nBeste ${customerName || 'klant'},\n\nUw afspraak is succesvol geboekt:\n\nDatum: ${appointmentDate}\nTijd: ${appointmentTime}\nPakket: ${packageName}\nLocatie: Zamenhofdreef 4, 3562 JW Utrecht\n\n${appointmentAreas.length ? `Behandelingsgebieden: ${appointmentAreas.join(', ')}\n\n` : ''}Belangrijke informatie:\n- Kom 15 minuten voor uw afspraak\n- Zorg dat de huid schoon en droog is\n- Vermijd zonnen 2 weken voor behandeling\n- Bij vragen, neem gerust contact op\n\nWe kijken ernaar uit u te zien!\n\nMet vriendelijke groet,\nShahed Beauty Team\n\nShahed Beauty\nZamenhofdreef 4, 3562 JW Utrecht, Nederland\nTelefoon: +31 6 85235657\nWhatsApp: +31 6 86116982\n\nAfspraak referentie: ${appointmentId}`
    });

    console.log('Appointment emails sent successfully');
    res.status(201).json({ message: 'Appointment created successfully', appointmentId });
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
      replyTo: email,
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
