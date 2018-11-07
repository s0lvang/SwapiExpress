const species = (sequelize, DataTypes) => {
  const Species = sequelize.define('Species', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    classification: {
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    average_height: {
      type: DataTypes.STRING,
    },
    average_lifespan: {
      type: DataTypes.STRING,
    },
    hair_colors: {
      type: DataTypes.STRING,
    },
    skin_colors: {
      type: DataTypes.STRING,
    },
    eye_colors: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });
  Species.associate = (models) => {
    const { Character, Planet } = models;
    Species.hasMany(Character, { as: 'people' });
    Species.belongsTo(Planet, { as: 'homeworld' });
  };
  return Species;
};

export default species;
