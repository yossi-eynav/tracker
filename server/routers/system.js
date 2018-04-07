const express = require('express');
const APIRouter = express.Router();
const systemController = require('../controllers/system');

APIRouter.use(`/ping`, systemController.ping);

module.exports = APIRouter;