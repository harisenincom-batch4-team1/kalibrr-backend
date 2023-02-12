"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Jobs.belongsTo(models.Companies, {
        foreignKey: "companyId",
      });
      models.Jobs.hasMany(models.JobApplications, {
        foreignKey: "jobId",
      });
      // models.Jobs.hasMany(models.JobSaveds, {
      //   foreignKey: "jobId",
      // });
    }
  }
  Jobs.init(
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
        references: { model: "Companies", key: "id" },
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
      jobDescription: {
        type: DataTypes.TEXT
      },
      jobQualification: {
        type: DataTypes.TEXT
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
      modelName: "Jobs",
    }
  );
  return Jobs;
};
