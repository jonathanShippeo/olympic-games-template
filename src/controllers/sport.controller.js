const Sport = require('../models/sport.model');

class SportController {
    /**
     * Lister tous les sports
     */
    async list(req, res) {
        const sports = await Sport.find();


        res.json({
            count: sports.length,
            sports: sports,
            test:"test ok"
        });
    }

    // ... A COMPLETER ...

     /**
     * Create a new sport 
     */
      async create(req, res) {
          
        const newSport = new Sport({name: "Ping Pong", category: "Chinois"});
        newSport.save().then(() => console.log('Ping Pong added'));
//  const ronaldo = new Sport({ name: 'Ronaldo44', category:'foot'});
//  newSport.save().then(() => console.log('Ping Pong added'));

      
    }
}

module.exports = SportController;
