module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "api_petmng",
    dialect: "mysql",
    //rate limiter = entre le serveur et client //ici rate limiteur entre bdd et serveur 
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };