const webpagesController = require('../controllers/webpages');

module.exports = (socket) => {
  socket.on('createWebpage', webpagesController.create);
  socket.on('appendIframe', webpagesController.appendIframe);
}