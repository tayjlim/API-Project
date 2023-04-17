'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.Review,{
        foreignKey:'spotId',
        hooks: true,
        onDelete:'CASCADE'
      }),
      Spot.hasMany(models.Booking,{
        foreignKey:'spotId',
        hooks:true,
        onDelete:'CASCADE'
      }),
      Spot.hasMany(models.SpotImage,{
        foreignKey:'spotId',
        hooks:true,
        onDelete:'CASCADE'
      }),
      Spot.belongsTo(models.User,{
        foreignKey:'ownerId'
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
