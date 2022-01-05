const Athlete = require('../models/athlete.model');
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

  async getSportById(sportId ,res){
    const sport = await Sport.findById(sportId);
    return sport
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
        const oSport = await Sport.findById(sportId);
        const oAthlete = athleteId;
        oSport.athletes.push(mongoose.Types.ObjectId(oAthlete));
        oSport.save();
    }

    //supprimer un sport
    async deleteSport(sportId, res) {
      Sport.findByIdAndRemove(sportId, (err, selectedSport) => {
        if (err) return res.status(500).send(err);
  
        const response = {
          message: "Sport successfully deleted",
          Deleted_id: selectedSport._id,
        };
        return res.status(200).send(response);
    });
  }  

  /**  TODO: modify
   * Endpoint to edit a sport with a spesific ID
   
  

    
*/
}

module.exports = SportController;