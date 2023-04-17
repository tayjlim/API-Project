'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {

    static associate(models) {
      SpotImage.belongsTo(models.Spot,{foreignKey:'spotId'})
    }
  }
  SpotImage.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN, // allowNull: false ?
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt", "spotId"]
      }
    },
    scopes: {
      currentSpot: {
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }
    }
  });
  return SpotImage;
};
