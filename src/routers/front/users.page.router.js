const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user.controller");
const usersController = new UserController();



/**
 * PAGE Athlètes   link=>  /users
 * List all athlètes
 */
router.get("/", async (req, res) => {
  usersController.users(req, res);
});

/**
 * PAGE users details
 * show users details
 */
router.get("/:id", async (req, res) => {
  usersController.userDetails(req.params.id, res);
});

// ... POST Users By Front Page...
router.post("/createUsers", (req, res) => {
  //Execution lors de la validation du formulaire dans l'index.html
  const formUser = req.body;
  usersController.insertUser(formUser, res);
});



router.post("/:userId",async (req,res) => {
  console.log('test');
  console.log(req.body.login);
  console.log(req.body.pass);
  //usersController.changeUserName(req.params.sporId,req.body.name,res);
  //res.redirect("back");
});

//Supprimer user par route get
router.get("/:userId/deleteUser2", async (req, res) => {
  const userId = req.params.userId;
  usersController.deleteUser(userId, res);
});




// ... DELETE Users...
router.post("/deleteUser", (req, res) => {
  const userId = req.body.userId;
  usersController.deleteUser(userId, res);
});



module.exports = router;
