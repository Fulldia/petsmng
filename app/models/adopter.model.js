//MODELE FONCTIONS CRUD
module.exports = (sequelize, Sequelize) => {
    const Adopter = sequelize.define("adopters", {
      adopt_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      lastname: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      postalcode: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      }
    });
    return Adopter;
  };

