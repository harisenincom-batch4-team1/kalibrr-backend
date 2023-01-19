"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Applicants, {
        foreignKey: "userId",
      });
      models.Users.hasMany(models.JobSaveds, {
        foreignKey: "userId",
      });
      models.Users.hasMany(models.Messages, {
        foreignKey: "userId",
      });
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
        allowNull: true,
      },
      skill: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedinUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
