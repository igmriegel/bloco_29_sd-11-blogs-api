const router = require('express').Router();
const { postServices } = require('../services');
// const { BlogPost } = require('../models');

const authMiddleware = require('../middlewares/authMiddleware');
// const customEror = require('../utils/customError');

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.authInfo;
    const newPost = await postServices.createPost({ title, content, categoryIds, userId: id });

    delete newPost.published;
    delete newPost.updated;

    return res.status(201).json(newPost);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
