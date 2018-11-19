const express = require('express');
const app = express();
const mongoose = require('mongoose');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

mongoose.connect('mongodb://caique:bcd127@ds155903.mlab.com:55903/goweekstudy', {
    useNewUrlParser: true
});
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => console.log('Server is running on 3000 port...'));