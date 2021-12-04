const router = require('express').Router();
const { userServices } = require('../services');

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await userServices.createUser({ displayName, email, password, image });

    return res.status(201).json({ token: newUser });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
