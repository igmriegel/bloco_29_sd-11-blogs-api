const router = require('express').Router();

const { Category } = require('../models');
const { categoryServices } = require('../services');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryServices.createCategory({ name });

    return res.status(201).json(newCategory);
  } catch (e) {
    next(e);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const categoryList = await Category.findAll();

    return res.status(200).json(categoryList);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
