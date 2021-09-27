const sequelize = require("sequelize");
const params = require("../params.json");

const seq = new sequelize.Sequelize(process.env.DB_NAME || params.db_name, process.env.DB_USERNAME || params.db_username, process.env.DB_PASSWORD || params.db_password, {
    host: process.env.DB_HOST || params.host,
    dialect: 'mysql',
});

const testConnection = () => seq.authenticate().then(() => {
    console.log("succes");
}, (err => { console.error(err); }));

module.exports={
    testConnection:testConnection,
    sequelize:seq
}