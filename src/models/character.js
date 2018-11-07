const character = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    mass: {
      type: DataTypes.STRING,
    },
    hair_color: {
      type: DataTypes.STRING,
    },
    skin_color: {
      type: DataTypes.STRING,
    },
    eye_color: {
      type: DataTypes.STRING,
    },
    birth_year: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });
  Character.associate = (models) => {
    const { Planet } = models;
    Character.belongsTo(Planet, { as: 'homeworld' });
  };

  return Character;
};

export default character;
