'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('orders', {
      fields: ['customer_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_customer_id_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'customers', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no customer_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })
    await queryInterface.addConstraint('orders', {
      fields: ['channel_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_channel_id_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'channels', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no customer_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })
    await queryInterface.addConstraint('orders',{
      fields: ['carrier_id'],
      type: 'foreign key',
      name: 'order_carrier_id_fk',
      references:{
        table: 'carriers',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
    await queryInterface.addConstraint('orders',{
      fields: ['shipment_priority_id'],
      type: 'foreign key',
      name: 'order_shipmentpriority_id_fk',
      references:{
        table: 'shipment_priorities',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
    await queryInterface.addConstraint('orders',{
      fields: ['payment_method_id'],
      type: 'foreign key',
      name: 'order_paymentmethod_id_fk',
      references:{
        table: 'payment_methods',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'order_paymentmethod_id_fk')
    await queryInterface.removeConstraint('orders', 'order_shipmentpriority_id_fk')
    await queryInterface.removeConstraint('orders', 'order_carrier_id_fk')
    await queryInterface.removeConstraint('orders', 'order_channel_id_fk')
    await queryInterface.removeConstraint('orders', 'order_customer_id_fk')
  }
};
