const Athlete = require("../models/athlete.model");
const Sport = require("../models/sport.model");
let mongoose = require("mongoose");
const fetch = require("node-fetch");

class AthleteController {

  /*API List athletes*/
  async list(req, res) {
    const athletes = await Athlete.find();
    res.json(athletes);
  }

  /*API List one athlete*/
  async getAthleteById(athleteId, res) {
    const athlete = await Athlete.findById(athleteId);
    res.json(athlete);
  }

  /*API Lists sport of an athlete*/

  async listSportsForOne(req, res) {
    const idAthlete = req.params.athleteId;
    const sportsForThisAthlete = await Sport.find({
      athletes: { $all: [idAthlete] },
    });

    const sports = sportsForThisAthlete.map((x) => {
      const name = x.name;
      const _data = name;
      return _data;
    });

     return sports;
  }

   /**
   * Create a new athlete  {POST}
   */
    async create(req, res) {
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

  async listSportsByAthlete(athleteId, res) {
    const listSportsAthlete = await Sport.find({
      athletes: { $in: mongoose.Types.ObjectId(athleteId) },
    });
    return listSportsAthlete;
  }



  async getNameAthleteById(athleteId, res) {
    const AthleteById = await Athlete.findById(athleteId);
    const AthleteName = AthleteById.firstName + " " + AthleteById.lastName;
    return AthleteName;
  }

  async insertAthlete(formAthlete, res) {
    try {
      if (
        formAthlete.firstName == "" &&
        formAthlete.lastName == "" &&
        formAthlete.gender == "" &&
        formAthlete.country == ""
      ) {
        console.log("Le champs est vide, veuillez remplir une valeur");
        res.redirect("/athletes");
      } else {
        Athlete.create(formAthlete);
        res.redirect("/athletes");
      }
    } catch (error) {
      console.log("Le champs n'est pas valide");
      res.redirect("/athletes");
    }
  }

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

  //API delete an athlete => supprimer un candidat
  async deleteAthlete(athleteId, res) {
    console.log(athleteId);
    Athlete.findByIdAndRemove(athleteId, (err, selectedAthlete) => {
      if (err) return res.status(500).send(err);
      res.redirect("/athletes");
    });
  }

  //Page Operations

  async athletes(req, res) {
    console.log("INFO: -> Page url: " + req.url);
    const listAthlete = await Athlete.find();
    res.render("athletes", { listAthlete, main: true });
  }

  async athleteDetails(athleteId, res) {
    const athlete = await Athlete.findById(athleteId);
    //console.log(id);
    res.render("athletes", { athlete,athleteId, main: false });
  }
}

module.exports = AthleteController;
