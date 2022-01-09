const express = require("express");
const router = express.Router();

const AthletesController = require("../../controllers/athlete.controller");
const athletesController = new AthletesController();

/**
 * PAGE Athlètes   link=>  /athletes
 * List all athlètes
 */
router.get("/", athletesController.athletes);

/**
 * PAGE athletes details
 * show athletes details
 */
router.get("/:id", async (req, res) => {
  athletesController.athleteDetails(req.params.id, res);
});

// ... POST Create Athletes from FRONT PAGE...
router.post("/", (req, res) => {
  const formAthlete = req.body;
  athletesController.insertAthlete(formAthlete, res);
});


router.get("/:athleteId/sports", async (req, res) => {
  console.log("Route: /:athleteId/sports");
  const athleteId = req.params.athleteId;
  const listSportsAthlete = await athletesController.listSportsByAthlete(athleteId,res);
  const athleteName = await athletesController.getNameAthleteById(athleteId,res);
  const athlete = await athletesController.getAthleteById(athleteId, res);

  res.render("athletes", {    listSportsAthlete,    athleteName,    athleteId,    athlete,    main: false,  });
});

// ... DELETE Athletes  !! FRONT PAGE !! ...
router.post("/deleteAthlete", async (req, res) => {
  const athleteId = req.params.athleteId;
  athletesController.deleteAthlete(athleteId, res);
});

// ... DELETE AVEC GET Athletes  !! OPTIONNEL !! ...
router.get("/:athleteId/deleteAthleteWithGet", async (req, res) => {
  console.log("Route: /:athleteId/deleteAthleteWithGet");
  const athleteId = req.params.athleteId;
  console.log("athleteId :");
  console.log(athleteId);
  athletesController.deleteAthlete(athleteId, res);
});

module.exports = router;
