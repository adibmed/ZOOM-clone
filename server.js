const express = require('express')
const app = express()
const server = require('http').Server(app)
const {v4: uuidv4} = require('uuid')
const io = require('socket.io')(server)
const {ExpressPeerServer} = require('peer')
const peerServer = ExpressPeerServer(server, {
    debug: true
})
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.status(200).send('Hello World')
    res.redirect(`/${uuidv4()}`)
})


app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room})
})
 
 
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => { 
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId);
        // messages
        socket.on('message', message => {
            io.to(roomId).emit('createMessage', message)
        })
        
    }); 

});

server.listen(3333)
