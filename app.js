const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  // Morgan is a popular middleware for Node.js applications
  // that is used to log HTTP request details such as URL, HTTP method, response status, response time, and more.
  app.use(morgan('dev'));
}

// express.json() is a built-in middleware function in Express.
//  This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.
app.use(express.json());

// express.static() is a built in middleware and it is used for serving
// static files.
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello wfrom middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// get request with id specified
// -> if we write ('/api/v1/tours/:id?) this means that id parameter is optional
// and client can make request without specifying id parameter
// -> in url if we type like ('/api/v1/tours/:id/:x/:m) in req.params all these
// specified values will be stored as key values of object like {id: '10', x: '20', m: '3'} if the url
//  typed is ('/api/v1/tours/10/20/3)

//////////////////////////////////////////////////////////////////////////////////
// The app.route() function returns an instance of a single route,
// which you can then use to handle HTTP verbs with optional middleware.
// Use app.route() to avoid duplicate route names (and thus typo errors).

// app.route('/api/v1/tours').get(getAllTours).post(createNewTour);
// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// app.route('/api/v1/users').get(getAllUsers).post(createNewUser);
// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

/////////////////////////////////////////////////////////////
// **  Mounting Routers  **//

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
