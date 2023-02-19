const express = require('express');
const router = express.Router();

const baseCtrl = require('../controllers/baseController');

router.get('/getOneById',  baseCtrl.getOneById);

module.exports = router;