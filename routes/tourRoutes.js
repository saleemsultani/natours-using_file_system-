const express = require('express');
const tourController = require('../controllers/tourController.js');

// The express.Router() function is used to create a new router object
// The Express router object is a collection of middlewares and routes
// router object is itself a middleware
// The router object allows developers to group related routes and handlers together under a common URL prefix,
//  making it easier to manage large applications with many routes.
//  It also enables developers to create modular and reusable route handlers that can be
// mounted at different URL paths within an application.
const router = express.Router();

// param is the middleware which runs for certain parameters defined in url, for example here it
// will run for the request which has id parameter in the request url
router.param('id', tourController.checkId);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createNewTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
