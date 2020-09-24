'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [{
      first_name: 'Admin',
      last_name: 'Rent',
      email: 'admin@gmail.com',
      password: '$2b$10$uwHnqUGtc1YC0ir6GFxeSORMvv9688F4RhlfQjCmJWATzTT33QUWq',
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
