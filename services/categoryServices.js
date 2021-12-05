const { Category } = require('../models');
const customError = require('../utils/customError');

const validateName = (name) => {
  if (!name) throw customError('"name" is required', 400);

  return true;
};

const createCategory = async (categoryData) => {
  const { name } = categoryData;
  const validName = validateName(name);

  if (validName) {
    const newCategory = await Category.create({ name });

    return newCategory;
  }
};

module.exports = {
  createCategory,
};
