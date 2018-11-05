module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Planets', {
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
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    diameter: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rotation_period: {
      type: Sequelize.STRING,
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
      type: Sequelize.STRING,
      allowNull: false,
    },
    population: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Planets'),
};
