const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require('./middleware/auth')

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

const uri = process.env.DATABASE_URI

mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false })

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('CONNECTED TO DATABASE')
})
const login = require('./routes/login')
app.use('/login', login)
const todos = require('./routes/todos')
app.use('/user', auth, todos)

app.listen(port, ()=>{
    console.log(`RUNNING ON PORT ${port}`)
})

