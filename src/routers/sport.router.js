const express = require('express');
const router = express.Router();

// Constantes sports & athletes
const SportController = require('../controllers/sport.controller');
const sportController = new SportController();
const AthleteController = require('../controllers/athlete.controller');
const Athlete = require('../models/athlete.model');
const athleteController = new AthleteController();

//Liste sports
router.get('/', async (req, res) => {
   const listSport =  await sportController.list(req, res);
   const listAthlete = await athleteController.list(req, res);
   res.render('sports', {listSport, listAthlete, main: true});
});



//Liste athlètes par sports
router.get('/:sportId/athletes', async (req, res) => {
  const sportId = req.params.sportId;
  //console.log(sportId);
  const sportName = await sportController.getNameSportById(sportId)
  const sport = await sportController.getSportById(sportId)
  const listAthleteIdBySport = await sportController.listAthleteIdBySport(sportId, res);
  const listAthleteBySport = await Athlete.find({ '_id': {$in : listAthleteIdBySport }});
  const listAthlete = await athleteController.list(req, res);
  res.render('sports', {listAthleteBySport, listAthlete, sportId, sportName: sportName, sport, main: false});
});

// ... POST Sports...
router.post('/createSports', (req, res) => {
    //Execution lors de la validation du formulaire dans l'index.html
    const sportName = req.body;
    console.log(sportName)
    sportController.insertSport(sportName, res);
    res.redirect('back');
  })

// Endpoint Ajouter un athlète dans un sport : POST /api/router.post('/addAthleteInSports', (req, res) => {
    router.post('/addAthleteInSports', (req, res) => {
        const oSport = req.body.sportId;
        const oAthlete = req.body.athleteId;
        //console.log(oAthlete);
        sportController.addAthleteInSport(oSport, oAthlete);
        res.redirect('back');
      })
  

// ... PUT Sports...
router.put('/', async (req, res) => {
    sportController.modify(req, res);
});

// ... DELETE Sports...
router.post('/deleteSport', (req, res) => {
  const sportId = req.body.sportId;
  sportController.deleteSport(sportId, res);
  //res.redirect('back');
});

//Supprimer sport par route get
router.get('/:sportId/deleteSport2', async (req, res) => {
  const sportId = req.params.sportId;
  sportController.deleteSport(sportId, res);
  //res.redirect('back');
});
/*// ... DELETE Sports...
router.delete('/:id', async (req, res) => {
    sportController.delete(req, res);
});
*/
// ... DELETE Athlete in Sports...
router.delete('/deleteAthleteInSports', async (req, res) => {
  sportController.delete(req, res);
});

//Supprimer un athlete dans ce sport
router.get('/:athleteId/:sportId/deleteAthlete', async (req, res) => {
  const sportId = req.params.sportId;
  const athleteId = req.params.athleteId;
  //console.log('sportId :');
  //console.log(sportId);
  //console.log('athleteId :');
  //console.log(athleteId);
  // ⚠️⚠️ Comment envoyé athleteId et sportId ? ⚠️⚠️
  sportController.delete(req, res);
  //res.redirect('back');
});




module.exports = router;
