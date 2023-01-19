"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.JobApplication.belongsTo(models.Applicant, {
        foreignKey: "applicantId",
      });
      models.JobApplication.belongsTo(models.Job, {
        foreignKey: "jobId",
      });
    }
  }
  JobApplication.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      applicantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Applicant", key: "id" },
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Job", key: "id" },
      },
      status: {
        type: DataTypes.ENUM,
        values: [
          "onreview",
          "selected",
          "interview",
          "test",
          "offering",
          "recruited",
          "rejected",
        ],
        defaultValue: "onreview",
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
      modelName: "JobApplication",
    }
  );
  return JobApplication;
};
