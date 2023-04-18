'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Spot,{
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
        hooks: true
      });
      User.hasMany(models.Booking,{
        foreignKey:'userId',
        onDelete: 'CASCADE',
        hooks: true
      });
      User.hasMany(models.Review,{
        foreignKey:'userId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  };

  User.init(
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"] }
        },
        loginUser: {
          attributes: {exclude:["createdAt", "updatedAt"]}
        },
        public: {
          attributes:{exclude: ["hashedPassword", "createdAt", "updatedAt", "username", "email"]}
        }
      }
    }
  );
  return User;
};
