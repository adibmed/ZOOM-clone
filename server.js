const express = require('express')
const app = express()
const server = require('http').Server(app)

// Set the view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // res.status(200).send('Hello World')
    res.render('room')
})


server.listen(4444)