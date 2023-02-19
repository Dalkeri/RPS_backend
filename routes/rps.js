const express = require('express');
const router = express.Router();

const RPSCtrl = require('../controllers/rps');

router.post('/getOneRPS',  RPSCtrl.getOneRPS);
router.get('/getHighscores',  RPSCtrl.getHighscores);
router.put('/saveUsername',  RPSCtrl.saveUsername);

module.exports = router;