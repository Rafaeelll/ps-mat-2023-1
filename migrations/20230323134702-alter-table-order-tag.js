'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('order_tags', {
      fields: ['order_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_tags_orders_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'orders', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no customer_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })

    await queryInterface.addConstraint('order_tags', {
      fields: ['tag_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_tags_tags_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'tags', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no order_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order_tags', 'order_tags_tags_fk')
    await queryInterface.removeConstraint('order_tags', 'order_tags_orders_fk')
  }
};