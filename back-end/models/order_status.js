'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Order,{
        through: 'order_rel_statuses',  //tabela intermediaria
        foreignKey: 'order_id',  // chave estrangeira da tabela intermediaria
        otherKey: 'order_status_id',  // outra chave da tabela intermediaria
        otherKey: 'user_id',
        as: 'orders'           // nome do campo de associação (plural)
      })
    }
  }
  OrderStatus.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sequence: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'OrderStatus',
    tableName: 'order_statuses'
  });
  return OrderStatus;
};