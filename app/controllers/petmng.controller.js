const db = require("../models");
const Pet = db.pet;
const Op = db.Sequelize.Op;

// Create and Save a new Pet
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a pet
  const pet = {
    pet_name: req.body.pet_name,
    animal: req.body.animal,
    breed: req.body.breed,
    birthdate: req.body.birthdate,
    reserved: req.body.reserved || false,
    shelter: req.body.shelter,
    arrival_date: req.body.arrival_date,
    depart_date: req.body.depart_date,
    image: req.body.image,
  };

  // Save pet in the database
  Pet.create(pet)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the pet."
      });
    });
};

// Retrieve all pets from the database.
exports.findAll = (req, res) => {
  const name = req.query.pet_name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Pet.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pets."
      });
    });
};

// Find a single pet with an id
exports.findOne = (req, res) => {
  const id = req.params.pet_id;

  Pet.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find pet with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving pet with id=" + id
      });
    });
};

// Update a pet by the id in the request
exports.update = (req, res) => {
  const id = req.params.pet_id;

  Pet.update(req.body, {
    where: { pet_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "pet was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update pet with id=${id}. Maybe pet was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating pet with id=" + id
      });
    });
};

// Delete a pet with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.pet_id;

  Pet.destroy({
    where: { pet_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "pet was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete pet with id=${id}. Maybe pet was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete pet with id=" + id
      });
    });
};


// Find all published pets
exports.findNotReserved = (req, res) => {
  Pet.findAll({ where: { reserved: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pets."
      });
    });
};