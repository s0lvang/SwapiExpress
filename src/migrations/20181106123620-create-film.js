
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Films', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Films'),
};
