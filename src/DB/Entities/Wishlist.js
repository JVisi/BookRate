
const sequelize = require("sequelize");
const dbConfig = require("../DBConfig");
const Book = require("./Book");
const User = require("./User");
const Wishlist = dbConfig.sequelize.define('wishlist', {
    id: {
        type: sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    }
}, { timestamps: false, tableName: "Wishlists" });
 User.belongsToMany(Book, { through: Wishlist });
 Book.belongsToMany(User, { through: Wishlist });
User.hasMany(Wishlist);
Wishlist.belongsTo(User);
Book.hasMany(Wishlist);
Wishlist.belongsTo(Book);
module.exports=Wishlist
