const express = require('express');
const authRoute = require('./auth.route');
const noteRoute = require('./note.route');

const config = require('../../config/config');

const router = express.Router();


router.use('/auth', authRoute);
router.use('/notes', noteRoute);

module.exports = router;