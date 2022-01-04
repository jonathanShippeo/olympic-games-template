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
   const listAthlete =  await athleteController.list(req, res);
   res.render('athletes', {listAthlete, main: true});
});

router.get('/:athleteId/sports', async (req, res) => {
  const athleteId = req.params.athleteId;
  const listSportsAthlete =  await athleteController.listSportsByAthlete(athleteId, res);
  const athleteName = await athleteController.getNameAthleteById(athleteId, res);
  res.render('athletes', {listSportsAthlete, athleteName, main: false});
});

/** 
 * Consulter les sports d'un athlète
 * GET /api/athletes/{athleteId}/sports
 */
router.get('/:athleteId/sports', async (req, res) => {
    athleteController.listSportsForOne(req, res);
});

// ... POST Athletes...
router.post('/createAthlete', (req, res) => {
    console.log('first value req:'+req.body);
    const formAthlete = req.body;
    athleteController.insertAthlete(formAthlete, res);
});

// ... DELETE Athletes  !! OPTIONNEL !! ...
router.delete('/:id', async (req, res) => {
    athleteController.delete(req, res);
});




module.exports = router;
