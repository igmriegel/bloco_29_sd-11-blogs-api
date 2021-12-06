const { BlogPost, Category, PostsCategory } = require('../models');
const customError = require('../utils/customError');
const generateTimeStamp = require('../utils/generateTimeStamp');

const validateTitle = (title) => {
  if (!title) throw customError('"title" is required', 400);

  return true; 
};

const validatePostContent = (content) => {
  if (!content) throw customError('"content" is required', 400);

  return true;
};

const validateCategoryIds = async (catIds) => {
  if (!catIds) throw customError('"categoryIds" is required', 400);

  const validIds = catIds.map(async (id) => {
    const category = await Category.findByPk(id);

    if (!category) throw Error('Category doesn\'t exists');
  });

  await Promise.all(validIds).catch((e) => {
    console.log(e);
    throw customError('"categoryIds" not found', 400);
  });

  return true;
};

const createPostCatRelations = async ({ postId, categoryIds }) => {
  const validIds = categoryIds.map(async (categoryId) => {
    await PostsCategory.create({ postId, categoryId });
  });

  await Promise.all(validIds);
};

const createPost = async (postData) => {
  const { title, content, categoryIds, userId } = postData;
  const validTitle = validateTitle(title);
  const validPostContent = validatePostContent(content);
  const validCatIds = await validateCategoryIds(categoryIds);

  if (validTitle && validPostContent && validCatIds) {
    const timeStamp = generateTimeStamp();
    console.log(timeStamp);
    const newPost = await BlogPost.create({
      title,
      content,
      userId,
      published: timeStamp,
      updated: timeStamp,
    });
    await createPostCatRelations({ postId: newPost.dataValues.id, categoryIds });

    return newPost.dataValues;
  }
};

module.exports = {
  createPost,
};
