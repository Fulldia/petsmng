# PETMNG - REST API

You can find API Swagger here :
http://localhost:3690/api/petmng/doc

## Install

    bundle install

## Run the app

    npm start

## Seeding

    npm run seed

# PETMNG CRUD

## Get list of Pets

### Request

`GET api/petmng/pets/`

    http://localhost:3690/api/petmng/pets/

## Create a new Pet

### Request

`POST api/petmng/pets/`

    http://localhost:3690/api/petmng/pets/
    
## Get a specific Pet

### Request

`GET api/petmng/pets/{pet_id}`

    http://localhost:3690/api/petmng/pets/{pet_id}

## Get all Pets not reserved

### Request

`GET api/petmng/notreserved}`

    http://localhost:3690/api/petmng/notreserved


## Get a non-existent Pet

### Request

`GET api/petmng/pets/`

    http://localhost:3690/api/petmng/pets/1000000

## Create a new Adopter

### Request

`POST api/petmng/adopters/`

    http://localhost:3690/api/petmng/adopters/


## Get list of Adopter

### Request

`GET api/petmng/adopters/`

    http://localhost:3690/api/petmng/adopters/

## Change a Pet

### Request

`PUT api/petmng/pets/1`

    http://localhost:3690/api/petmng/pets/1


## Change a Adopter

### Request

`PUT api/petmng/adopters/1`

    http://localhost:3690/api/petmng/adopters/1



## Delete a Pet

### Request

`DELETE api/petmng/pets/1`

    http://localhost:3690/api/petmng/pets/1


## Delete an Adopter

### Request

`DELETE api/petmng/adopters/1`

    http://localhost:3690/api/petmng/adopters/1
