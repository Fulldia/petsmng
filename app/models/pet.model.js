//MODELE FONCTIONS CRUD
module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define("pets", {
        pet_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pet_name: {
            type: Sequelize.STRING
        },
        animal: {
            type: Sequelize.STRING
        },
        breed: {
            type: Sequelize.STRING
        },
        birthyear: {
            type: Sequelize.INTEGER
        },
        reserved: {
            type: Sequelize.BOOLEAN
        },
        shelter: {
            type: Sequelize.STRING
        },
        arrival_date: {
            type: Sequelize.STRING
        },
        depart_date: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        adopt_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'adopters',
                key: 'adopt_id'
            }
        }
    });
    return Pet;
};



  
  
