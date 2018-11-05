module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Planets', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    climate: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    surface_water: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
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
  }),
  down: queryInterface => queryInterface.dropTable('Planets'),
};
