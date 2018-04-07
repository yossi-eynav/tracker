const express = require('express');
const APIRouter = express.Router();
const config = require('../../config/server');
const trackingRouter = require('./tracking');


APIRouter.use(`/${config.API_VERSION}`, trackingRouter);

module.exports = APIRouter;