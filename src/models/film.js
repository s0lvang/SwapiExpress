const film = (sequelize, DataTypes) => {
  const Film = sequelize.define('Film', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    producer: {
      type: DataTypes.STRING,
    },
    episode_id: {
      type: DataTypes.INTEGER,
    },
    director: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.STRING,
    },
    opening_crawl: {
      type: DataTypes.STRING,
    },
  });
  Film.associate = () => {
    // this should take in models
    // associations can be defined here
  };
  return Film;
};

export default film;
