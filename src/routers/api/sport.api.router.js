const express = require("express");
const router = express.Router();

// Constantes sports & athletes
const SportController = require("../../controllers/sport.controller");
const sportController = new SportController();
const AthleteController = require("../../controllers/athlete.controller");
const Athlete = require("../../models/athlete.model");
const async = require("hbs/lib/async");
const athleteController = new AthleteController();



//POST /api/sports
router.post("/",async(req,res) =>{
  sportController.create(req, res);
})

//GET /api/sports
router.get("/", sportController.list);

//GET /api/sports/{sportId}/athletes   
router.get("/:sportId/athletes", async (req, res) => {
  const sportId = req.params.sportId;
  sportController.getAthletesForSport(sportId,res);
});

// POST /api/sports/{sportId}/athletes/{athleteId}
router.post('/:sportId/athletes/:athleteId',async (req,res)=>{
  sportController.addOneAthleteToSport(req.params.sportId, req.params.athleteId,res);
})


// ... PUT Sports...
router.put("/", async (req, res) => {
  sportController.modify(req, res);
});


// ... DELETE Sports...
router.delete('/:id', async (req, res) => {
  sportController.delete(req, res);
});






module.exports = router;
