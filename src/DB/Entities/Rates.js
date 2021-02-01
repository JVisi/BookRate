
const sequelize = require("sequelize");
const dbConfig = require("../dbConfig");
const Book = require("./Book");
const User = require("./User");
const Rate = dbConfig.sequelize.define('rate', {
    id: {
        type: sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    rate: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false, tableName: "rates" });
 User.belongsToMany(Book, { through: Rate });
 Book.belongsToMany(User, { through: Rate });
User.hasMany(Rate);
Rate.belongsTo(User);
Book.hasMany(Rate);
Rate.belongsTo(Book);
module.exports=Rate
