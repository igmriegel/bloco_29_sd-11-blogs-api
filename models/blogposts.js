const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPosts;
};

module.exports = BlogPost;