'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['supplier_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'product_suppliers_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'suppliers', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no customer_tags
      onUpdate: 'CASCADE'   // Atualiza order_id em order se id em order mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'product_suppliers_fk')
  }
};
