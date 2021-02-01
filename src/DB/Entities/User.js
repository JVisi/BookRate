const sequelize = require("sequelize");
const dbConfig = require("../dbConfig");
const User = dbConfig.sequelize.define('user', {
    id: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    googleId: {
        type: sequelize.DataTypes.STRING,             //if someone has googleId, they don't need password, otherwise password is necessary
        allowNull: true,
        unique: true
    },
    email: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports=User
