module.exports = app => {
  const pets = require("../controllers/petmng.controller.js");
  const adopters = require("../controllers/adopter.controller.js");
  const { authJwt } = require("../middleware");
  
  

  var router = require("express").Router();

  //  CREER UN PET
  router.post("/pets/", pets.create);

  // RECHERCHER UN PET PAR ID
  router.get("/pets/:pet_id", [authJwt.verifyToken], pets.findOne);


  //RECUPERER TOUS LES noms de PETS
  router.get("/pets/", pets.findAll);

  // AFFICHE TOUS LES ANIMAUX QUI NE SONT PAS RESERVES
  router.get("/notreserved/", [authJwt.verifyToken], pets.findNotReserved);

  // MODIFIE UN PET
  router.put("/pets/:pet_id", pets.update);

  // SUPPRIMER UN PET
  router.delete("/pets/:pet_id", pets.delete);



  // CREER UN ADOPTANT
  router.post("/adopters/", adopters.create);

  // RECHERCHER UN ADOPTER PAR ID
  router.get("/adopters/:adopt_id", adopters.findOne);

  // LISTE TOUS LES NOMS DES ADOPTANTS
  router.get("/adopters/", adopters.findAll);

  //MODIFIE UN ADOPTANT
  router.put("/adopters/:adopt_id", adopters.update);

  // SUPPRIMER UN ADOPTANT
  router.delete("/adopters/:adopt_id", adopters.delete);



  app.use('/api/petmng', router);
};