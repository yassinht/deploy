const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Maintenance mode middleware
app.use((req, res, next) => {
  if (fs.existsSync('/var/www/maintenance.flag')) {
    res.status(503).sendFile(path.join(__dirname, 'maintenance.html'));
  } else {
    next();
  }
});

// Serve static files
app.use(express.static('dist/medIn/'));


// nodemailer


app.post('/api/sendmail', (req, res) => {
    const { name, email, subject, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });
  
    const mailOptions = {
      from: `${email}`,
      to: '',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.send('Email sent successfully');
      }
    });
  });





// Serve index.html for all routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve('dist/medIn/index.html'));
});

// Start the server
app.listen(7000, () => {
  console.log('App running on port 7000');
});

