const starship = (sequelize, DataTypes) => {
  const Starship = sequelize.define('Starship', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    MGLT: {
      type: DataTypes.STRING,
    },
    hyperdrive_rating: {
      type: DataTypes.STRING,
    },
    starship_class: {
      type: DataTypes.STRING,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    cost_in_credits: {
      type: DataTypes.STRING,
    },
    length: {
      type: DataTypes.STRING,
    },
    crew: {
      type: DataTypes.STRING,
    },
    passengers: {
      type: DataTypes.STRING,
    },
    max_atmosphering_speed: {
      type: DataTypes.STRING,
    },
    cargo_capacity: {
      type: DataTypes.STRING,
    },
    consumables: {
      type: DataTypes.STRING,
    },

  },
  {
    timestamps: false,
  });
  Starship.associate = (models) => {
    const { Character } = models;
    Starship.belongsToMany(Character, { as: 'pilots', through: 'VehicleCharacter' });
    Character.belongsToMany(Starship, { as: 'ships', through: 'VehicleCharacter' });
  };
  return Starship;
};

export default starship;
