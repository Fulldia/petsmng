const db = require("../models");
const Adopter = db.adopter;
const Op = db.Sequelize.Op;




// Create and Save a new Adopter
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }
 
   // Create a adopter
   const adopter = {
     lastname: req.body.lastname,
     firstname: req.body.firstname,
     address: req.body.address,
     postalcode: req.body.postalcode,
     city: req.body.city,
     phone: req.body.shelter,
     email: req.body.arrival_date,
   };
 
   // Save adopter in the database
   Adopter.create(adopter)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the adopter."
       });
     });
 };
 
 // Retrieve all adopters from the database.
 exports.findAll = (req, res) => {
   const name = req.query.pet_name;
   var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
 
   Adopter.findAll({ where: condition })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving adopters."
       });
     });
 };
 
 // Find a single adopter with an id
 exports.findOne = (req, res) => {
   const id = req.params.adopt_id;
 
   Adopter.findByPk(id)
     .then(data => {
       if (data) {
         res.send(data);
       } else {
         res.status(404).send({
           message: `Cannot find adopter with id=${id}.`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error retrieving adopter with id=" + id
       });
     });
 };
 
 // Update a adopter by the id in the request
 exports.update = (req, res) => {
   const id = req.params.adopt_id;
 
   Adopter.update(req.body, {
     where: { adopt_id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "adopter was updated successfully."
         });
       } else {
         res.send({
           message: `Cannot update adopter with id=${id}. Maybe adopter was not found or req.body is empty!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating adopter with id=" + id
       });
     });
 };
 
 // Delete a adopter with the specified id in the request
 exports.delete = (req, res) => {
   const id = req.params.adopt_id;
 
   Adopter.destroy({
     where: { adopt_id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "adopter was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete adopter with id=${id}. Maybe adopter was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete adopter with id=" + id
       });
     });
 };
 