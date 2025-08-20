// Example function to save appointment data
export const saveAppointmentToDatabase = async (bookingData) => {
  try {
    const response = await fetch('http://localhost:4000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pkg: bookingData.pkg,
        package: bookingData.package || bookingData.pkg,
        date: bookingData.date instanceof Date ? bookingData.date.toISOString() : bookingData.date,
        time: bookingData.time,
        name: bookingData.name,
        customerName: bookingData.customerName || bookingData.name,
        email: bookingData.email,
        customerEmail: bookingData.customerEmail || bookingData.email,
        phone: bookingData.phone,
        customerPhone: bookingData.customerPhone || bookingData.phone,
        notes: bookingData.notes,
        areas: bookingData.areas || [],
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
