const router = require('express').Router();
const { loginServices } = require('../services');

router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginServices.logUserIn({ email, password });

    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
