const router = require('express').Router();
const { createUser } = require('../services/userServices');

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await createUser({ displayName, email, password, image });

    return res.status(201).json({ token: newUser });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
