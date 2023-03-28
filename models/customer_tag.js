'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer,{
        foreignKey:'customer_id',
        targetKey: 'id',
        as: 'customer'
      })
      this.belongsTo(models.Tag,{
        foreignKey:'tag_id',
        targetKey: 'id',
        as: 'tag'
      })
    }
  }
  CustomerTag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'CustomerTag',
    tableName: 'customer_tags'
  });
  return CustomerTag;
};