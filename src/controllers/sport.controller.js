const Sport = require('../models/sport.model');

class SportController {
    /**
     * Lister tous les sports
     */
    async list(req, res) {
        const sports = await Sport.find();

        res.json({
            count: sports.length,
            sports: sports
        });
    }

   
     /**
     * Create a new sport  {POST}
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
        //res.json('New Sport added');
    }

    


    /**  TODO: modify  
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

   /**  TODO: modify  
     * Endpoint to edit a sport with a spesific ID
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


}

module.exports = SportController;
