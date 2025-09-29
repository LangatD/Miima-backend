app.post('/api/quotes', express.json(), (req, res) => {
  try {
  
    console.log('Quote request received:', req.body);
    const {
      name, email, phone, company, service, 
      location, description, city, state, zip
    } = req.body;
    
    const reference = `MSG${Date.now().toString().slice(-6)}`;
    
    const adminEmails = [
      'dorcaschepngetich044@gmail.com',
      
    ];
    
    adminEmails.forEach(adminEmail => {
      sendEmail({
        to: adminEmail,
        subject: `New Quote Request • ${reference}`,
        template: 'admin-notification',
        data: { name, email, phone, company, service, reference }
      });
    });
    
    sendEmail({
      to: email,
      subject: `Quote Request Received • ${reference}`,
      template: 'client-acknowledgment',
      data: { name, reference }
    });
    
    res.json({ success: true, reference });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});