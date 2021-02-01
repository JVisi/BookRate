const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const body_parser = require("body-parser");
const passport=require('passport')
const cookie=require("cookie-session")
require("./src/Authorization/PassportSetup")
const router = require("./src/Routes/Router");
const db=require('./src/DB/DBConfig');

// const Rate = require("./src/DB/Entities/Rates");
//  const Book = require("./src/DB/Entities/Book");
//  const User = require("./src/DB/Entities/User");
//  //User.sync({force:true})
//  //Book.sync({force:true})
//  Rate.sync()
// db.testConnection()
// Rate.findAll({ include: [Book,User], where: { id: 1 } }).then((result) => { console.log(result[0]); });

const port = process.env.port || 3000;
const app = express();
app.use(helmet());
app.use(cors());
app.use(cookie({
    name: 'bookrate-session',
    maxAge:3600000,
    keys: ['s3coor3k3y']
  }));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(router)
app.listen(port, () => {
    console.info(`app is listening on port ${port}`);
});