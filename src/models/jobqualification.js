"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobQualifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.JobQualifications.belongsTo(models.Jobs, {
        foreignKey: "qualificationId",
      });
    }
  }
  JobQualifications.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      qualificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Jobs", key: "id" },
      },
      qualification: {
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
      modelName: "JobQualifications",
    }
  );
  return JobQualifications;
};
