const express = require('express');
const cors = require('cors');
const path = require('path');
const trips = require('./routes/trips');
const auth = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', auth);
app.use('/api/trips', trips);

app.get('/', (req, res) => res.json({ status: 'TripWhiz API' }));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
