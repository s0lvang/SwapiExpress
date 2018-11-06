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
  Film.associate = (models) => {
    const {
      Starship, Species, Character, Vehicle, Planet,
    } = models;
    Film.belongsToMany(Starship, { through: 'FilmStarship' });
    Starship.belongsToMany(Film, { through: 'FilmStarship' });

    Film.belongsToMany(Planet, { through: 'FilmPlanet' });
    Planet.belongsToMany(Film, { through: 'FilmPlanet' });

    Film.belongsToMany(Character, { through: 'FilmCharacter' });
    Character.belongsToMany(Film, { through: 'FilmCharacter' });

    Film.belongsToMany(Vehicle, { through: 'FilmVehicle' });
    Vehicle.belongsToMany(Film, { through: 'FilmVehicle' });

    Film.belongsToMany(Species, { through: 'FilmSpecies' });
    Species.belongsToMany(Film, { through: 'FilmSpecies' });
  };
  return Film;
};

export default film;
