const express = require("express");
const rateLimit = require('express-rate-limit');
const cors = require("cors");

const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const swaggerOptions = {
  swaggerDefinition:{
    info:{title:" PETMNG - API ",
    version:"1.0.0"
  },
  },
  apis:[
    "server.js"
]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
console.log(swaggerDocs)



app.use("/api/petmng/doc",swaggerUI.serve,swaggerUI.setup(swaggerDocs))
/**
 * @swagger
 * /api/petmng/pets:
 *    get:
 *      description: get all pets
 *      responses: 
 *          200: 
 *            description: Success
 */

/** 
* @swagger
* /api/petmng/notreserved:
*    get:
*      description: get all pets not reserved
*      responses: 
*          200: 
*            description: Success
*/

/**
* @swagger
* /api/petmng/pets/{pet_id}:
*    get:
*      description: get pet by id
*      parameters:
          - in: path
            name: pet_id
            required: true
       responses: 
*          200: 
*            description: Success
*/



/**
 * 
 * @swagger
 * /api/petmng/pets:
 *    post:
 *      description: create new pet
 *      parameters: 
 *          - name: pet_name 
 *            description: the pet's name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: animal
 *            description: animal
 *            in: formData
 *            required: true
 *            type: string
 *          - name: breed
 *            description: breed
 *            in: formData
 *            required: false
 *            type: string
 *          - name: birthyear
 *            description: birthyear
 *            in: formData
 *            required: false
 *            type: string
 *          - name: reserved
 *            description: reserved ?
 *            in: formData
 *            required: false
 *            type: boolean
 *          - name: shelter
 *            description: shelter
 *            in: formData
 *            required: false
 *            type: string
 *          - name: arrival_date
 *            description: date of arrival
 *            in: formData
 *            required: false
 *            type: date
 *          - name: depart_date
 *            description: date of departure
 *            in: formData
 *            required: false
 *            type: date
 *          - name: adopt_id
 *            description: adopter
 *            in: formData
 *            required: false
 *            type: string
 *      responses: 
 *            201:
 *              description: Added
 */

/**
* @swagger
* /api/petmng/pets/{pet_id}:
*    put:
*      description: update pet by id
*      parameters: 
 *          - name: pet_name 
 *            description: the pet's name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: animal
 *            description: animal
 *            in: formData
 *            required: true
 *            type: string
 *          - name: breed
 *            description: breed
 *            in: formData
 *            required: false
 *            type: string
 *          - name: birthyear
 *            description: birthyear
 *            in: formData
 *            required: false
 *            type: string
 *          - name: reserved
 *            description: reserved ?
 *            in: formData
 *            required: false
 *            type: boolean
 *          - name: shelter
 *            description: shelter
 *            in: formData
 *            required: false
 *            type: string
 *          - name: arrival_date
 *            description: date of arrival
 *            in: formData
 *            required: false
 *            type: date
 *          - name: depart_date
 *            description: date of departure
 *            in: formData
 *            required: false
 *            type: date
 *          - name: adopt_id
 *            description: adopter
 *            in: formData
 *            required: false
 *            type: string
 *      responses: 
 *            201:
 *              description: Updated
*/

//RATE LIMITER//




// Create the rate limit rule
const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1, // limit each IP to 2 requests per windowMs
    message: "Your limit exceeded"
})

// Use the limit rule as an application middleware
app.use(apiRequestLimiter)



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to fulldia application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/petmng.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 3690;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./app/models");

const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

//IMPORTER LES DONNEES FACTICES

const importData = require('./app/middleware/import.js');

importData().then(() => {
  // Code pour utiliser les données importées
  console.log('Données importées avec succès');
})
.catch((error) => {
  console.error('Erreur lors de l import des données :', error);
});



