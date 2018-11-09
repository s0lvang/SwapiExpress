const transport = (sequelize, DataTypes) => {
  const Transport = sequelize.define('Transport', {
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
  Transport.associate = () => {
  };
  return Transport;
};

export default transport;
