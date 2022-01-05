const Athlete = require('../models/athlete.model');
const Sport = require('../models/sport.model');
let mongoose = require('mongoose');

class AthleteController {
    /*List athletes*/
    async list(req, res) {
        const athlete = await Athlete.find();
        return athlete
    }

    async getNameAthleteById(athleteId ,res){
        const AthleteById = await Athlete.findById(athleteId);
        const AthleteName = AthleteById.firstName + " " + AthleteById.lastName
        return AthleteName;
    }

    async getAthleteById(athleteId ,res){
      const athlete = await Athlete.findById(athleteId);
      //console.log(athlete);
      return athlete
  }

    async insertAthlete(formAthlete, res){
       
       try {
            if(formAthlete.firstName == "" && formAthlete.lastName == "" && formAthlete.gender == "" && formAthlete.country == "" ){
                console.log("Le champs est vide, veuillez remplir une valeur")
                res.redirect('/api/athletes')
            } else {
                //ajouter dans collection mongoose
                Athlete.create(formAthlete);
                //redirection sur lui-même
                res.redirect('/api/athletes')
            }
        
        } catch (error) {
            console.log("Le champs n'est pas valide")
            res.redirect('/api/athletes')
        }
        
    }

    async listSportsByAthlete(athleteId, res) {
        const listSportsAthlete = await Sport.find({ 'athletes': {$in : mongoose.Types.ObjectId(athleteId) }});
        return listSportsAthlete;
    }

    //supprimer un candidat
    async deleteAthlete(athleteId, res) {
        Athlete.findByIdAndRemove(athleteId, (err, selectedAthlete) => {
          if (err) return res.status(500).send(err);
    
          const response = {
            message: "Athlete successfully deleted",
            Deleted_id: selectedAthlete._id,
          };
          return res.status(200).send(response);
      });
    }  
    
    
    /**  TODO: modify
   * Endpoint to edit a Athlete with a spesific ID
  
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
   */
}

module.exports = AthleteController;