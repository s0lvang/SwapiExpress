const film = (sequelize, DataTypes) => {
  const Film = sequelize.define('Film', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Film.associate = () => { // this should take in models
    // associations can be defined here
  };
  return Film;
};

export default film;
