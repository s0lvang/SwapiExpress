const character = (sequelize, DataTypes) => {
  const Species = sequelize.define('Species', {
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
  });
  Species.associate = () => {
    // this should take in models
    // associations can be defined here
  };
  return Species;
};

export default character;
