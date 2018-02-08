const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost/NodeAuthAPI')

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/users', require('./routes/users'))

app.use('/db', require('./routes/db'))

// Start the server
const port = process.env.PORT || 3800
app.listen(port)
console.log(`Server is listening at ${port}`)
