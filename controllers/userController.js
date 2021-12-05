const router = require('express').Router();
const { userServices } = require('../services');
const { User } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await userServices.createUser({ displayName, email, password, image });

    return res.status(201).json({ token: newUser });
  } catch (e) {
    next(e);
  }
});

router.get('/', authMiddleware, async (_req, res, next) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
