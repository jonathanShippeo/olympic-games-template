const express = require("express");
const router = express.Router();

const SportsController = require("../../controllers/sport.controller");
const AthletesController = require("../../controllers/athlete.controller");
const sportsController = new SportsController();
const athletesController = new AthletesController();

/**
 * PAGE Athlètes   link=>  /athletes
 * List all athlètes
 */

router.get("/", sportsController.sports);

/**
 * PAGE athletes details
 * show athletes details
 */
router.get("/:id", async (req, res) => {
  sportsController.sportDetails(req.params.id, res);
});

// ... POST Sports By Front Page...
router.post("/createSports", (req, res) => {
  //Execution lors de la validation du formulaire dans l'index.html
  const sportName = req.body;
  console.log(sportName);
  sportsController.insertSport(sportName, res);
});

//Liste athlètes par sports
router.get("/:sportId/athletes", async (req, res) => {
  const sportId = req.params.sportId;
  //console.log(sportId);
  const sportName = await sportsController.getNameSportById(sportId);
  const sport = await sportsController.getSportById(sportId);
  const listAthleteIdBySport = await sportsController.listAthleteIdBySport(
    sportId,
    res
  );
  const listAthleteBySport = await Athlete.find({
    _id: { $in: listAthleteIdBySport },
  });
  const listAthlete = await athletesController.list(req, res);
  res.render("sports", {
    listAthleteBySport,
    listAthlete,
    sportId,
    sportName: sportName,
    sport,
    main: false,
  });
});

// Endpoint Ajouter un athlète dans un sport : POST /api/router.post('/addAthleteInSports', (req, res) => {
router.post("/addAthleteInSports", async (req, res) => {
  const oSport = req.body.sportId;
  const oAthlete = req.body.athleteId;
  await sportsController.addAthleteInSport(oSport, oAthlete);
  const link = "/sports/" + oSport;
  res.redirect(link);
});

router.put("/:sporId",async (req,res) => {
  console.log(req.body.name);
  sportsController.changeSportName(req.params.sporId,req.body.name,res);
  res.redirect("back");
});

//Supprimer sport par route get
router.get("/:sportId/deleteSport2", async (req, res) => {
  const sportId = req.params.sportId;
  sportsController.deleteSport(sportId, res);
});

//Supprimer un athlete dans ce sport
router.get("/:athleteId/:sportId/deleteAthlete", async (req, res) => {
  sportsController.deleteAthleteFromSport(
    req.params.sportId,
    req.params.athleteId,
    res
  );
  res.redirect("back");
});

// ... DELETE Sports...
router.post("/deleteSport", (req, res) => {
  const sportId = req.body.sportId;
  sportsController.deleteSport(sportId, res);
});

// ... DELETE Athlete in Sports...
router.delete("/deleteAthleteInSports", async (req, res) => {
  sportsController.delete(req, res);
});

module.exports = router;
