const express = require('express');
const router = express.Router();

const SportController = require('../controllers/sport.controller');
const sportController = new SportController();

router.get('/', async (req, res) => {
    sportController.list(req, res);
});

// ... POST Sports...
router.post('/', async (req, res) => {
    sportController.create(req, res);
});

// ... PUT Sports...
router.put('/', async (req, res) => {
    sportController.modify(req, res);
});

// ... DELETE Sports...
router.delete('/:id', async (req, res) => {
    sportController.delete(req, res);
});




module.exports = router;
