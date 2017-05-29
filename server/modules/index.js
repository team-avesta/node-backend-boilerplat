const express = require('express');
const userRoutes = require('./user/user.route');

const router = express.Router();

router.get('/health-check', (req, res) =>
    res.send('OK')
);

router.use('/user', userRoutes);

module.exports = router;
