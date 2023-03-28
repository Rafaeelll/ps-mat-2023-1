'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey: 'city_id', // Nome do campo na tabela de ORIGEM
        targetKey: 'id',       // Nome do campo na tabela de DESTINO
        as: 'city'             // Nome do atributo para exibição
      })
      // this.hasMany(models.CustomerTag,{
      //   foreignKey: 'customer_id',
      //   sourceKey: 'id',
      //   as: 'tags'
      // })
      this.belongsToMany(models.Tag,{
        through: 'customer_tags',   //tabela intermediaria
        foreignKey: 'customer_id',  // chave estrangeira da tabela intermediaria
        otherKey: 'tag_id',         // outra chave da tabela intermediaria
        as: 'tags'                  // nome do campo de associação (plural)
      })
    }
  }
  Customer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    is_whatsapp: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers'
  });
  return Customer;
};