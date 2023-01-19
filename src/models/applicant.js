"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Applicants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Applicants.belongsTo(models.Users, {
        foreignKey: "userId",
      });
      models.Applicants.hasMany(models.JobApplications, {
        foreignKey: "applicantId",
      });
    }
  }
  Applicants.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      cv: {
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
      modelName: "Applicants",
    }
  );
  return Applicants;
};
