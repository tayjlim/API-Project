// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const reviewImages = require ('./review-images.js')
const spotImages = require('./spot-images.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null



router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/bookings',bookingsRouter)
router.use('/reviews', reviewsRouter);
router.use('/spot-images',spotImages);
router.use('/review-images',reviewImages);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
