require('dotenv').config()

const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', ()=>console.log("connected"));

app.use(express.json())
app.use(
  cors({
    origin:"http://localhost:3000"
}))

const usersRouter = require('./routes/users')
const gamesRouter = require('./routes/games')
const statsRouter = require('./routes/stats')
app.use('/api/users', usersRouter)
app.use('/api/games', gamesRouter)
app.use('/api/stats', statsRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req,res) => {
    res.send(__dirname, 'client', 'build', 'index.html')
  })
}

app.get('/', (req,res) => {
  console.log("server is live")
  res.send({message:'server is live'})
})
 
app.listen((process.env.PORT), () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})