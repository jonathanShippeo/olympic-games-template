const express = require("express");
const router = express.Router();

const AthleteController = require("../../controllers/athlete.controller");
const athleteController = new AthleteController();

// ... API GET => List All Athletes
router.get("/", async (req, res) => {
  const listAthlete = await athleteController.list(req, res);
  res.send(listAthlete);
});

/**
 * Consulter les sports d'un athlète
 * GET /api/athletes/{athleteId}/sports
 */
router.get("/:athleteId/sports", async (req, res) => {
  const result = await athleteController.listSportsForOne(req, res);
   res.send(result);
});

// ... API POST Create an athletes...
router.post('/', async (req, res) => {
  athleteController.create(req, res);
});


// ... API DELETE Athletes  !! OPTIONNEL !! ...
router.delete('/:id', async (req, res) => {
  athleteController.delete(req, res);
});




module.exports = router;
