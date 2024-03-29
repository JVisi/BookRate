const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const body_parser = require("body-parser");
const passport=require('passport')
const cookie=require("cookie-session")
const router = require("./src/Routes/Router");
const db=require('./src/DB/DBConfig');
const port = process.env.PORT || 5000;
const app = express();


app.use(helmet());
app.use(cors());
app.use(cookie({
    name: 'bookrate-session',
    maxAge:3600000,
    keys: ['s3coor3k3y','s3coor3k3y2']
  }));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(passport.initialize())
app.use(passport.session())

require("./src/Authorization/PassportSetup")
app.use(router)

app.listen(port, () => {
    console.info(`app is listening on port ${port}`);
});