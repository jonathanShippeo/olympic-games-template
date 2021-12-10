const express = require('express');
const router = express.Router();

const SportController = require('../controllers/sport.controller');
const sportController = new SportController();

router.get('/sports/', async (req, res) => {
    sportController.list(req, res);
});

// ... POST Sports...
router.post('/sports/', async (req, res) => {
    sportController.create(req, res);
});

// ... PUT Sports...
router.put('/sports/', async (req, res) => {
    sportController.modify(req, res);
});

// ... DELETE Sports...
router.delete('/sports/:id', async (req, res) => {
    sportController.delete(req, res);
});




module.exports = router;
