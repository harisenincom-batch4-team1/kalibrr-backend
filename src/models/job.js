"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Job.belongsTo(models.Company, {
        foreignKey: "companyId",
      });
      models.Job.hasMany(models.JobApplication, {
        foreignKey: "jobId",
      });
      models.Job.hasMany(models.JobQualification, {
        foreignKey: "qualificationId",
      });
      models.Job.hasMany(models.JobSaved, {
        foreignKey: "jobId",
      });
    }
  }
  Job.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Company", key: "id" },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenure: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      salaryMin: {
        type: DataTypes.BIGINT,
      },
      salaryMax: {
        type: DataTypes.BIGINT,
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
      modelName: "Job",
    }
  );
  return Job;
};
