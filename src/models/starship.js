const starship = (sequelize, DataTypes) => {
  const Starship = sequelize.define('Starship', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    hyperdrive_rating: {
      type: DataTypes.STRING,
    },
    starship_class: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });
  Starship.associate = (models) => {
    const { Character, Transport } = models;
    Starship.belongsTo(Transport, { foreignKey: 'transportId' });
    Starship.belongsToMany(Character, { as: 'pilots', through: 'VehicleCharacter' });
    Character.belongsToMany(Starship, { as: 'ships', through: 'VehicleCharacter' });
  };
  return Starship;
};

export default starship;
