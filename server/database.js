const mongoose = require('mongoose');
const { stringify } = require('querystring');

mongoose.connect('mongodb://localhost:27017/Sudoku_db', {useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error: "));
db.once('open', ()=>console.log("connected"));