"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobSaveds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.JobSaveds.belongsTo(models.Users, {
        foreignKey: "userId",
      });
      models.JobSaveds.belongsTo(models.Jobs, {
        foreignKey: "jobId",
      });
    }
  }
  JobSaveds.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Jobs", key: "id" },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
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
      modelName: "JobSaveds",
    }
  );
  return JobSaveds;
};
