const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user.controller");
const userController = new UserController();


// ... API POST Create an users...
router.post('/', async (req, res) => {
  userController.create(req, res);
});

// ... API PUT => Modify spesific User
router.put("/:userId",async(req,res)=>{
  userController.modify(req, res);
});

// ... API GET => List All Users
router.get("/", async (req, res) => {
  const listUser = await userController.list(req, res);
  res.send(listUser);
});


/**
 * Consulter les users d'un athlète
 * GET /api/users/{userId}
 */
router.get("/:userId", async (req, res) => {
  userController.getOneUser(req, res);
});



// ... API DELETE Users  !! OPTIONNEL !! ...
router.delete('/:id', async (req, res) => {
  userController.delete(req, res);
});




module.exports = router;
