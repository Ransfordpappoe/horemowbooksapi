const express = require('express');
const router = express.Router();
const liveTokenController = require('../../controllers/liveTokenController');

router.route('/')
    .post(liveTokenController.createUser);
module.exports = router;