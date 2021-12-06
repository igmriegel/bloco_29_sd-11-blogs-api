const PostsCategories = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategory', {}, { timestamps: false });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    }, {
      timestamps: false,
    });
  };

  return PostCategory;
};

module.exports = PostsCategories;