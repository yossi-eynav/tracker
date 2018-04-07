class System {
   static ping(req, res) {
        res.send(`Pong, the time is ${new Date()}`)
   }
}

module.exports = System;