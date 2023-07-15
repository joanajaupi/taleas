require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DB_URL;
 mongoose.connect(mongoString);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('connected', ()=>{
    console.log('Connected to database');
});
module.exports = db;