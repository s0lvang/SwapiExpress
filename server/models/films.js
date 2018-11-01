module.exports = (sequelize, DataTypes) => {
  const Films = sequelize.define('Films', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Films.associate = (models) => {
    // associations can be defined here
  };
  return Films;
};
