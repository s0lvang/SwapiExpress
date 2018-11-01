module.exports = (sequelize, DataTypes) => {
  const Planets = sequelize.define('Planets', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    climate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surface_water: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diameter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rotation_period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    terrain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gravity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orbital_period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  });
  return Planets;
};
