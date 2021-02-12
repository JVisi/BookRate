const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const body_parser = require("body-parser");
const passport=require('passport')
const cookie=require("cookie-session")
const fs =require('fs')
require("./src/Authorization/PassportSetup")
const router = require("./src/Routes/Router");
const db=require('./src/DB/DBConfig');
const https=require('https')
const port = process.env.PORT || 3000;
const app = express();

const key = fs.readFileSync('./cert/key.pem')
const cert = fs.readFileSync('./cert/cert.pem')




// const Rate = require("./src/DB/Entities/Rates");
//  const Book = require("./src/DB/Entities/Book");
//  const User = require("./src/DB/Entities/User");
//  //User.sync({force:true})
//  //Book.sync({force:true})
// db.testConnection()
// Rate.findAll({ include: [Book,User], where: { id: 1 } }).then((result) => { console.log(result[0]); });








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

app.get('/', (req, res) => { res.send('this is an secure server') });
// const server=https.createServer({key: key, cert: cert }, app)
// server.listen(3001, () => { console.log(`listening on ${port}`) });
app.listen(port, () => {
    console.info(`app is listening on port ${port}`);
});