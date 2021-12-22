const Athlete = require("../models/athlete.model");
const Sport = require("../models/sport.model");

class AthleteController {
  /**
   * Lister tous les athletes
   */
  async list(req, res) {
    const athletes = await Athlete.find();

    res.json({
      count: athletes.length,
      athletes: athletes,
    });
  }

  async listSportsForOne(req, res) {
    const idAthlete = req.params.athleteId;
    const sportsForThisAthlete = await Sport.find({
      athletes: { $all: [idAthlete] },
    },{name:1 ,_id: 0});

    const sports = sportsForThisAthlete.map((x) => {
      const name = x.name;
      const _data = name;
      return _data;
    });

    const response={
      id : idAthlete,
      sports : sports
    }

    res.json(response);
  }

  /**
   * Create a new athlete  {POST}
   */
  async create(req, res) {
    console.log(req.body);
    if (!req.body || !req.body.firstName) {
      console.error("ooops ajoutez tous les champs surout prenom");
      res.status(400).end();
      return;
    }

    const newAthlete = new Athlete(req.body);
    newAthlete
      .save()
      .then((addedItem) => {
        console.log("New Athlete added");
        return res.status(200).send(addedItem);
      })
      .catch((err) => {
        if (err) return res.status(500).send(err);
      });
  }

  /**  TODO: modify
   * Endpoint to edit a Athlete with a spesific ID
   */
  async modify(req, res) {
    if (!req.body || !req.body.firstName) {
        console.error("ooops ajoutez tous les champs surout prenom");
        res.status(400).end();
        return;
      }
    const idAthlete = req.body.id;
    const Athlete = req.body.name;
    const idAthletes = req.body.athletes;

    const filter = { _id: idAthlete };
    const update = { name: Athlete, athletes: idAthletes };

    Athlete.findByIdAndUpdate(
      filter,
      update,
      { new: true },
      (err, updatedItem) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.status(200).send(updatedItem);
      }
    );
  }

  /**  TODO: modify
   * Endpoint to edit a Athlete with a spesific ID
   */
  async delete(req, res) {
    // The "selectedAthlete" in this callback function represents the document that was found.
    Athlete.findByIdAndRemove(req.params.id, (err, selectedAthlete) => {
      if (err) return res.status(500).send(err);

      const response = {
        message: "Athlete successfully deleted",
        Deleted_id: selectedAthlete._id,
      };

      return res.status(200).send(response);
    });
  }
}

module.exports = AthleteController;
