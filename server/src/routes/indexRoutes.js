const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');

const registerRoutes = (app) => {
    app.use('/api/users', userRoute);
}

module.exports = registerRoutes;