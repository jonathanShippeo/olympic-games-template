const Sport = require('../models/sport.model');
const mongoose = require('mongoose');

class SportController {
    /*List sports*/
    async list(req, res) {
      const sports = await Sport.find();
      return sports
  }

    async getNameSportById(sportId ,res){
        const SportById = await Sport.findById(sportId);
        return SportById.name;
    }


    async insertSport(sportName, res){
        //add collection mongoose
        Sport.create(sportName);
        //redirection
        res.redirect('/api/sports')
    }

    
    async listAthleteIdBySport(sportId ,res){
        const SportById = await Sport.findById(sportId);
        return SportById.athletes;
    }



    //Ajouter Athlete dans un sport
    async addAthleteInSport(sportId, athleteId){
        const monSport = await Sport.findById(sportId);
        const monAthlete = athleteId;
        monSport.athletes.push(mongoose.Types.ObjectId(monAthlete));
        monSport.save();
    }

    /**  TODO: modify
   * Endpoint to edit a sport with a spesific ID
   
  async delete(req, res) {
    // The "selectedSport" in this callback function represents the document that was found.
    Sport.findByIdAndRemove(req.params.id, (err, selectedSport) => {
      if (err) return res.status(500).send(err);

      const response = {
        message: "Sport successfully deleted",
        Deleted_id: selectedSport._id,
      };

      return res.status(200).send(response);
    });
  }
*/
}

module.exports = SportController;