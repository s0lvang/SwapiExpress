module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Films', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    producer: {
      type: Sequelize.STRING,
    },
    episode_id: {
      type: Sequelize.INTEGER,
    },
    director: {
      type: Sequelize.STRING,
    },
    release_date: {
      type: Sequelize.STRING,
    },
    opening_crawl: {
      type: Sequelize.TEXT,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Films'),
};
