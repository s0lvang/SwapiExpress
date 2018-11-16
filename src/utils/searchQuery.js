import { Op } from 'sequelize';

const searchQuery = (search, searchTerms) => {
  const searchString = `%${search}%`;
  return searchTerms.map((searchTerm) => {
    const rootObject = {};
    rootObject[searchTerm] = { [Op.iLike]: searchString };
    return rootObject;
  });
};


export default searchQuery;
