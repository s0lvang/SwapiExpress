const vehicle = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
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
  });
  Vehicle.associate = () => {
    // this should take in models
    // associations can be defined here
  };
  return Vehicle;
};

export default vehicle;
