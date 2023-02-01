const csv = require('csv-parser');
const fs = require('fs');
const { adopter } = require('../models');

const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('api_petmng', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
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



sequelize.sync().then(async () => {
    const petsCSV = [];
    const adoptersCSV = [];
    let petId = 0;

    // Lire les utilisateurs depuis le fichier CSV
    // Lire les adopters depuis le fichier CSV

    fs.createReadStream('app/middleware/adopters.csv')
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


    fs.createReadStream('app/middleware/pets.csv')
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


