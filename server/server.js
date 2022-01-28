const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')

require("dotenv").config();

const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/Sudoku_db', {useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error: "));
db.once('open', ()=>console.log("connected"));

app.use(cors())
app.use(express.json())

app.use(require("./routes/record"))

const usersRouter = require('./routes/users')

app.use('/api/users', usersRouter)

app.get('/', () => {
    console.log("server is live")
})
 
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})