'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // Renomeia os campos created_at e update_at da tabela users
    //para createdAt e updatedAt, respectivamente
    await queryInterface.renameColumn('users', 'created_at', 'createdAt')
    await queryInterface.renameColumn('users', 'updated_at', 'updatedAt')
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Reverte as alteraç~pes feitas no up()
    await queryInterface.renameColumn('users', 'created_at', 'createdAt')
    await queryInterface.renameColumn('users', 'updated_at', 'updatedAt')
  }
};
