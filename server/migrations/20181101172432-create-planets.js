module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Planets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      climate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surface_water: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      diameter: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rotation_period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      terrain: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gravity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orbital_period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      population: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: (queryInterface /*, Sequelize */) => {
    return queryInterface.dropTable('Planets');
  },
};
