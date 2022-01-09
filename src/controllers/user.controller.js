const User = require("../models/user.model");

class UserController {
  /**
   * API: List users {GET}
  */
  async list(req, res) {
    const users = await User.find();
    res.json(users);
  }

  /**
   * API: Users for a spesific User  {GET}
   */
  async getOneUser(req,res){
    const userId = req.params.userId;
    const selectedUser = await User.findById(userId)
     res.json(selectedUser);
  }

  /**
    * API: Create a new user  {POST}
  */
     async create(req, res) {

      const login= req.body.login;
      const pass= req.body.password;

     const newUser = new User({login: login , password: pass});
     newUser.save()
     .then((addedItem) =>{
         console.log('New User added')
         return res.status(200).send(addedItem);} )
     .catch(err => {
         if (err) return res.status(500).send(err);
     })
 }

/**  API: modify  
     * Endpoint to edit a user with a spesific ID
     */
 async modify(req, res) {
  const userId=req.params.userId;
  const login = req.body.login;
  const pass= req.body.password;

  const filter = {_id:userId}
  const update ={login:login , password:pass}

 User.findByIdAndUpdate(filter,update,{new: true},
     (err, updatedItem) => {
     // Handle any possible database errors
         if (err) return res.status(500).send(err);
         return res.send(updatedItem);
     }
 )

}

/**  API Delete 
  * Endpoint to delete a user with a spesific ID
  */
 async delete(req, res) {
  // The "selectedUser" in this callback function represents the document that was found.
  User.findByIdAndRemove(req.params.id,(err,selectedUser)=>{
  if (err) return res.status(500).send(err);

  const response = {
      message: "User successfully deleted",
      Deleted_id: selectedUser._id
  };

  return res.status(200).send(response);

 });

}


}

module.exports = UserController;
