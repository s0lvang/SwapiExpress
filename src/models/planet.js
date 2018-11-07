export default (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diameter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rotation_period: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    population: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  });
  return Planet;
};
