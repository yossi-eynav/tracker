const express = require('express');
const router = express.Router();
const webpagesRouter = express.Router();
const Webpage = require('../../models/Webpage');
const HtmlModule = require('../../lib/Html');
const WebpagesController = require('../../controllers/webpages');

router.use('/tracking/webpages', webpagesRouter)

webpagesRouter
    .get('/', WebpagesController.getAll)
    .get('/:webpage/compare', WebpagesController.compare)

module.exports = router;