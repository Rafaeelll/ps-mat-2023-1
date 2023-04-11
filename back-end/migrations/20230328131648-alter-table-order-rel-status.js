'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_rel_status_id_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'orders', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no customer_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_status_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_status_id_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'order_statuses', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no order_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['user_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'order_rel_status_user_id_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'users', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no order_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order_rel_status', 'order_rel_status_user_id_fk')
    await queryInterface.removeConstraint('order_rel_status', 'order_status_id_fk')
    await queryInterface.removeConstraint('order_rel_status', 'order_rel_status_id_fk')
  }
};