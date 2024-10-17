const express = require('express');
const path= require('path');
require('dotenv').config();
const { sequelize, TennisPost } = require('./models');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app= express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});
var corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
}
app.use(express.json());
app.use(cors(corsOptions));
function authSocket(msg, next) {
    
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}
io.on('connection', socket => {
    socket.use(authSocket);
    socket.on('tennisPost', msg => {
       
        TennisPost.create({ title: msg.title, text: msg.text, userId: msg.userId })
            .then( rows => {
                TennisPost.findOne({ where: { id: rows.id }, })
                    .then( msg => io.emit('tennisPost', JSON.stringify(msg)) ) 
            }).catch( err => console.log(err.message) );
    });
    socket.on('editTennisPost', msg => {
        TennisPost.update({ title: msg.title, text: msg.text }, { where: { id: msg.id } })
            .then( rows => {
                TennisPost.findOne({ where: { id: msg.id }, })
                    .then( msg => io.emit('editTennisPost', JSON.stringify(msg)) )
            }).catch( err => console.log(err.message) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

server.listen({port:8000},async()=>{
    await sequelize.authenticate();
    console.log("SERVER osluskuje port 8000");

})




