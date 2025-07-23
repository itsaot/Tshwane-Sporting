require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const galleryRoutes = require('./routes/galleryRoutes');
const staffRoutes = require('./routes/staffRoutes');
const app = express();


const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/staff', staffRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('DB Error:', err));
