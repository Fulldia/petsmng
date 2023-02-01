/*const fs = require('fs');
const csv = require('csv-parser');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('api_petmng', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
 },
});

const Pet = sequelize.define('pets', {
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
    }});

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      Pet.create({
        pet_id: row.pet_id,
        pet_name: row.pet_name,
        animal: row.animal,
        breed: row.breed,
        birthyear: row.birthyear,
        reserved: row.reserved,
        shelter: row.shelter,
        arrival_date: row.arrival_date,
        depart_date: row.depart_date,
        image: row.image,
        adopt_id: row.adopt_id
      });
    })
    .on('SIGINT', () => conn.close())
    
  */
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('api_petmng', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

const csv = require('csv-parser');
const fs = require('fs');
const { adopter } = require('../models');

const Pet = sequelize.define('pets', {
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

const Adopter = sequelize.define('adopters', {
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

// définir la relation entre les tables Pets et Adopters
Pet.belongsTo(Adopter, { foreignKey: 'adopt_id', as: 'adopters' });

sequelize.sync().then(async () => {
    const petsCSV = [];
    const adoptersCSV = [];
    let petId = 0;

    // Lire les utilisateurs depuis le fichier CSV
    // Lire les adopters depuis le fichier CSV

    fs.createReadStream('adopters.csv')
    .pipe(csv())
    .on('data', (data) => {
        adoptersCSV.push({
            adopt_id: data.adopt_id,
            lastname: data.lastname,
            firstname: data.firstname,
            birthdate: data.birthdate,
            address: data.address,
            postalcode: data.postalcode,
            city: data.city,
            phone: data.phone,
            email: data.email,
            createdAt: data.createdAt,
            updatedAt: data.updateAt
        });
    })
    .on('end', async () => {
        // Inserer les adopters
        const adopters = await Adopter.bulkCreate(adoptersCSV);
        console.log(`adopter insérés: ${adopters.length}`);
    });


    fs.createReadStream('pets.csv')
        .pipe(csv())
        .on('data', (data) => {
            petsCSV.push({
                pet_id: data.pet_id,
                pet_name: data.pet_name,
                animal: data.animal,
                breed: data.breed,
                birthyear: data.birthyear,
                reserved: data.reserved,
                shelter: data.shelter,
                arrival_date: data.arrival_date,
                depart_date: data.depart_date,
                image: data.image,
 //             adopt_id: data.adopt_id
            });
        })
        .on('end', async () => {
            // Inserer les utilisateurs
            const pets = await Pet.bulkCreate(petsCSV);
            console.log(`Pets insérés: ${pets.length}`);
            petId = pets[pets.length - 1].id;

            
        });
});
