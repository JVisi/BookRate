const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const body_parser = require("body-parser");

const db=require('./src/DB/DBConfig')

db.testConnection()

const port = process.env.port || 3000;
const app = express();
app.use(helmet());
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.listen(port, () => {
    console.info(`app is listening on port ${port}`);
});