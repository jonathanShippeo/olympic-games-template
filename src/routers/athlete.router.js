const express = require('express');
const router = express.Router();

const AthleteController = require('../controllers/athlete.controller');
const athleteController = new AthleteController();

/**
 * TODO
 * API Athlètes
 * Créer un athlète : POST /api/athletes
 * Lister les athlètes : GET /api/athletes
 *  : GET /api/athletes/{athleteId}/sports 
 */

router.get('/', async (req, res) => {
    athleteController.list(req, res);
});

/** 
 * Consulter les sports d'un athlète
 * GET /api/athletes/{athleteId}/sports
 */
router.get('/:athleteId/sports', async (req, res) => {
    athleteController.listSportsForOne(req, res);
});

// ... POST Athletes...
router.post('/', async (req, res) => {
    athleteController.create(req, res);
});

// ... DELETE Athletes  !! OPTIONNEL !! ...
router.delete('/:id', async (req, res) => {
    athleteController.delete(req, res);
});




module.exports = router;
