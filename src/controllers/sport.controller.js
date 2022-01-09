const Athlete = require("../models/athlete.model");
const Sport = require("../models/sport.model");
const mongoose = require("mongoose");
const res = require("express/lib/response");

class SportController {
  /**
   * API: List sports {GET}
  */
  async list(req, res) {
    const sports = await Sport.find();
    res.json(sports);
  }

  /**
   * API: Athletes for a spesific Sport  {GET}
   */
  async getAthletesForSport(sportId,res){
    const selectedSport = await Sport.findById(sportId)
     res.json(selectedSport.athletes);
  }

  /**
    * API: Create a new sport  {POST}
  */
     async create(req, res) {

      const sport= req.body.name;
      const idAthletes= req.body.athletes;

     const newSport = new Sport({name: sport , athletes: idAthletes});
     newSport.save()
     .then((addedItem) =>{
         console.log('New Sport added')
         return res.status(200).send(addedItem);} )
     .catch(err => {
         if (err) return res.status(500).send(err);
     })
 }



  async listAthleteIdBySport(sportId, res) {
    const SportById = await Sport.findById(sportId);
    return SportById.athletes;
  }


/**
   * API: add an athlete to a spesific sport 
   *
   */
 async addOneAthleteToSport(idSport, athleteId, res) {
  // Query to get content of selected sport
  const selectedSport = await Sport.findById(idSport);
  console.log(selectedSport.athletes);

  //Prepare body to add
  let athletesToPost = [];
  athletesToPost = selectedSport.athletes;

  if (!athletesToPost.includes(athleteId)) {
    athletesToPost.push(athleteId);
  }
  //modify by update
  const filter = { _id: idSport };
  const update = { athletes: athletesToPost };

  Sport.findByIdAndUpdate(
    filter,
    update,
    { new: true },
    (err, updatedItem) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send(updatedItem);
    }
  );
  //TODO Error handling for this end point
}


/**  API: modify  
     * Endpoint to edit a sport with a spesific ID
     */
 async modify(req, res) {

  const idSport = req.body.id;
  const sport= req.body.name;
  const idAthletes= req.body.athletes;

  const filter = {_id:idSport}
  const update ={name:sport , athletes:idAthletes}

 Sport.findByIdAndUpdate(filter,update,{new: true},
     (err, updatedItem) => {
     // Handle any possible database errors
         if (err) return res.status(500).send(err);
         return res.send(updatedItem);
     }
 )

}

/**  API Delete 
  * Endpoint to delete a sport with a spesific ID
  */
 async delete(req, res) {
  // The "selectedSport" in this callback function represents the document that was found.
  Sport.findByIdAndRemove(req.params.id,(err,selectedSport)=>{
  if (err) return res.status(500).send(err);

  const response = {
      message: "Sport successfully deleted",
      Deleted_id: selectedSport._id
  };

  return res.status(200).send(response);

 });

}


 

  //supprimer un sport par front page
  async deleteSport(sportId, res) {
    Sport.findByIdAndRemove(sportId, (err, selectedSport) => {
      if (err) return res.status(500).send(err);
       res.redirect("/sports")
    });
  }

  //Page Operations

  async sports(req, res) {
    const listSport = await Sport.find();
    res.render("sports", { listSport, main: true });
  }

  //Liste athlètes par sports
  async sportDetails(sportId, res) {
    const sportName = await this.getNameSportById(sportId);
    const sport = await this.getSportById(sportId);
    const listAthleteIdBySport = await this.listAthleteIdBySport(sportId, res);
    const listAthleteBySport = await Athlete.find({
      _id: { $in: listAthleteIdBySport },
    });
    const listAthlete = await Athlete.find();
    return res.render("sports", {
      listAthleteBySport,
      listAthlete,
      sportId,
      sportName: sportName,
      sport,
      main: false,
    });
  }

  
  async getNameSportById(sportId, res) {
    const SportById = await Sport.findById(sportId);
    return SportById.name;
  }

  async getSportById(sportId, res) {
    const sport = await Sport.findById(sportId);
    return sport;
  }

  async insertSport(sportName, res) {
    Sport.create(sportName);
    res.redirect("/sports");
  }

   //Ajouter Athlete dans un sport
   async addAthleteInSport(sportId, athleteId) {
    const oSport = await Sport.findById(sportId);
    const oAthlete = athleteId;
    oSport.athletes.push(mongoose.Types.ObjectId(oAthlete));
    oSport.save();
  }

  async deleteAthleteFromSport(sportId, athleteId, res) {
    const sport = await this.getSportById(sportId);

    let athletesToUpdate = sport.athletes;

    //Prepare body to add
    for (let i = 0; i < athletesToUpdate.length; i++) {
      if (athletesToUpdate[i] == athleteId) {
        athletesToUpdate.splice(i, 1);
      }
    }

    const filter = { _id: sportId };
    const update = { athletes: athletesToUpdate };
    Sport.findByIdAndUpdate(
      filter,
      update,
      { new: true },
      (err, updatedItem) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        res.status(200);
        console.log('*************************Athlete deleted from this sport *********************');
      }
    );

  }
}

module.exports = SportController;
