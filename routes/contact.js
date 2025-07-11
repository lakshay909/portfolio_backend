const express = require('express');
const router = express.Router();

// If you have a Contact model, uncomment this:
// const Contact = require('../models/Contact');

// POST contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'All fields are required',
        missing: {
          name: !name,
          email: !email,
          subject: !subject,
          message: !message
        }
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // If you have MongoDB model, use this:
    // const newContact = new Contact({
    //   name,
    //   email,
    //   subject,
    //   message,
    //   createdAt: new Date()
    // });
    // const savedContact = await newContact.save();
    
    // For now, just log the contact form data
    console.log('📧 Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });
    
    // Here you could also send email notification
    // await sendEmailNotification({ name, email, subject, message });
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// GET all contact messages (for admin use)
router.get('/', async (req, res) => {
  try {
    // If you have MongoDB model, use this:
    // const contacts = await Contact.find().sort({ createdAt: -1 });
    // res.json(contacts);
    
    // For now, return empty array
    res.json([]);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;