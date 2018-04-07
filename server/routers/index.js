const express = require('express');
const router = express.Router();
const APIRouter = require('./api/');
const systemAPI = require('./system')

router.use('/api', APIRouter);
router.use('/system', systemAPI);

module.exports = router;