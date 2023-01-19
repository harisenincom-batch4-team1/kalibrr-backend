"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobSaved extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.JobSaved.belongsTo(models.User, {
        foreignKey: "userId",
      });
      models.JobSaved.belongsTo(models.Job, {
        foreignKey: "jobId",
      });
    }
  }
  JobSaved.init(
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
        references: { model: "Job", key: "id" },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "User", key: "id" },
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
      modelName: "JobSaved",
    }
  );
  return JobSaved;
};
