const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

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

// Serve index.html for all routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve('dist/medIn/index.html'));
});

// Start the server
app.listen(7000, () => {
  console.log('App running on port 7000');
});
