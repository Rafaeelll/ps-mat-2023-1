'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PayamentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PayamentMethod.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING(30)
    },
    operator_fee: {
      type: DataTypes.DECIMAL(18, 2)
    },
  }, {
    sequelize,
    modelName: 'PayamentMethod',
    tableName: 'payament_methods'
  });
  return PayamentMethod;
};