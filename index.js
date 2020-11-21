require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Servidor express
const app = express();

// configurar cors
app.use(cors());

// read and parse body
app.use(express.json());

// Database
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/search', require('./routes/searchs'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en: ' + process.env.PORT);
})