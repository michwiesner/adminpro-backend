const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');


// Servidor express
const app = express();

// configurar cors
app.use(cors());

// Database
dbConnection();

// rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en: ' + process.env.PORT);
})