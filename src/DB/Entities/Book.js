
const sequelize = require("sequelize");
const config = require("../DBConfig");
const Book = config.sequelize.define('book', {
    id: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    ISBN: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    author: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    year: {
        type: sequelize.DataTypes.SMALLINT,
        allowNull: true,
        unique: false
    },
    languageCode: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    added: {
        type: sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    addedBy: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
module.exports=Book
