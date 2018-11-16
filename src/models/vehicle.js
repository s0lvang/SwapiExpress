const vehicle = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    vehicle_class: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  });
  Vehicle.associate = (models) => {
    const { Transport, Character } = models;
    Vehicle.belongsTo(Transport, { foreignKey: 'transportId' });
    Vehicle.belongsToMany(Character, { as: 'pilots', through: 'VehicleCharacter' });
    Character.belongsToMany(Vehicle, { as: 'vehicles', through: 'VehicleCharacter' });
  };
  return Vehicle;
};

export default vehicle;
