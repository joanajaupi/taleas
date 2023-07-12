const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');
require('dotenv').config();

const mongoString = process.env.DB_URL;
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

mongoose.connect(mongoString);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('connected', ()=>{
    console.log('Connected to database');
})

app.use('/', routes);

