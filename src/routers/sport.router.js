const express = require('express');
const router = express.Router();

const SportController = require('../controllers/sport.controller');
const sportController = new SportController();

router.get('/sports/', async (req, res) => {
    sportController.list(req, res);
});

// ... A COMPLETER ...
router.post('/sports/', async (req, res) => {
    sportController.create(req, res);
});
module.exports = router;
