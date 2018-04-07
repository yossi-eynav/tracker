const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = require('./routers/')
const config = require('./config/server');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const socketEventListeners = require('./sockets/event-listeners'); 

mongoose.connect('mongodb://localhost/extension');
mongoose.Promise = require('bluebird');

app.use(bodyParser.json());
app.use(cors())
app.use('/history', express.static(path.resolve(__dirname + '/view/dist/')));
app.use('/', router)

io.on('connection', socketEventListeners);

server.listen(config.PORT, function () {
  console.log(`The server is listening on port ${config.PORT}!`)
});

   

