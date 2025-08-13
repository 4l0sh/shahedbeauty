// Example function to save appointment data
export const saveAppointmentToDatabase = async (bookingData) => {
  try {
    const response = await fetch('http://localhost:4000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        package: bookingData.pkg,
        date: bookingData.date.toISOString(),
        time: bookingData.time,
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        notes: bookingData.notes,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save appointment');
    }

    const result = await response.json();
    console.log('Appointment saved successfully:', result);
    return result;
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw error;
  }
};

// Example function to send confirmation email
export const sendConfirmationEmail = async (bookingData) => {
  try {
    const response = await fetch('http://localhost:4000/api/send-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    });

    return await response.json();
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};
