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
    let data = [
      { name: 'action' },
      { name: 'comedy' },
      { name: 'crime' },
      { name: 'drama' },
      { name: 'fantasy' },
      { name: 'religius' },
      { name: 'romance' },
      { name: 'sci-fi' },
      { name: 'thriller' }
    ]
    data = data.map(i => ({ ...i, createdAt: new Date(), updatedAt: new Date() }))
    return queryInterface.bulkInsert('Genres', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
