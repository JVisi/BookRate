//require('dotenv').config()
const sequelize = require("sequelize");
//const params = require("../params.json");

const seq = new sequelize.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

const testConnection = () => seq.authenticate().then(() => {
    console.log("succes");
}, (err => { console.error(err); }));

module.exports={
    testConnection:testConnection,
    sequelize:seq
}