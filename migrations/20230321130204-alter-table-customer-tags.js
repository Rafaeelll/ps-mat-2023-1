'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('customer_tags', {
      fields: ['customer_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'customer_tags_customers_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'customers', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no customer_tags
      onUpdate: 'CASCADE'   // Atualiza customer_id em customer se id em customer mudar
    })

    await queryInterface.addConstraint('customer_tags', {
      fields: ['tag_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'customer_tags_tags_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'tags', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT', // Não deixa apagar uma tag em uso no customer_tags
      onUpdate: 'CASCADE'   // Atualiza tag_id em customer_tags se id em tags mudar
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('customer_tags', 'customers_tags_tags_fk')
    await queryInterface.removeConstraint('customer_tags', 'customers_tags_customers_fk')
  }
};
