'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //criar a chave estrangeira da tabela customers para tabela cities
    await queryInterface.addConstraint('customers', {
      fields: ['city_id'], //campo(s) da tabela de origem
      type: 'foreign key',
      name: 'customers_cities_fk', // nome da chave estrangeira (deve ser único do BD)
      references:{
        table: 'cities', //tabela estrangeira
        field: 'id'      // Campo da tabela estrangeira

      },
      onDelete: 'RESTRICT', // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'   // Atualiza city_id em customer se id em city mudar
    })

  },

  async down (queryInterface, Sequelize) {
    // Reverte as alterações do up()
    await queryInterface.removeConstraint('customers', 'customers_cities_fk')
  }
};
