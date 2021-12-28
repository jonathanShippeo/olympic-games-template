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

// Endpoint Ajouter un athlète dans un sport : POST /api/sports/{sportId}/athletes/{athleteId}
router.post('/:sportId/athletes/:athleteId',async (req,res)=>{
    sportController.addOneAthleteToSport(req.params.sportId, req.params.athleteId,res);
})

// ... PUT Sports...
router.put('/', async (req, res) => {
    sportController.modify(req, res);
});

// ... DELETE Sports...
router.delete('/:id', async (req, res) => {
    sportController.delete(req, res);
});




module.exports = router;
