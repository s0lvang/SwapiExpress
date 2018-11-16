const search = (sequelize, DataTypes) => {
  const Search = sequelize.define('Search', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    search_url: {
      type: DataTypes.STRING,
    },
    search_string: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
  });

  return Search;
};

export default search;
