const sequelize = require("sequelize");
const params = require("../params.json");

const seq = new sequelize.Sequelize(params.db_name, params.db_username, params.db_password, {
    host: params.host,
    dialect: 'mysql',
});

const testConnection = () => seq.authenticate().then(() => {
    console.log("succes");
}, (err => { console.error(err); }));

module.exports={
    testConnection:testConnection,
    sequelize:seq
}