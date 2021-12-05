const router = require('express').Router();
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

module.exports = router;
