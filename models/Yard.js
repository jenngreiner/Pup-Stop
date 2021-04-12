const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Yard extends Model {}

Yard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fence: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    water: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    hasPets: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "yard",
  }
);

module.exports = Yard;
