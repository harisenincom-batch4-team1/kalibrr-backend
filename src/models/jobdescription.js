"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobDescriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.JobDescriptions.belongsTo(models.Jobs, {
        foreignKey: "descriptionId",
      });
    }
  }
  JobDescriptions.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      descriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Jobs", key: "id" },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "JobDescriptions",
    }
  );
  return JobDescriptions;
};
