const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Check ID
exports.checkId = (req, res, next, val) => {
  console.log(`ID entered is ${val}`);
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};

// Check Tour
exports.checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }
  next();
};

// get all tours
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

// get specific tour
exports.getTour = (req, res) => {
  const params = req.params;
  const id = parseInt(params.id);

  // search for element with id equal to specified id in URL
  const tour = tours.find((el) => el.id === id);

  // if ther is no tour with id specified in URL
  if (!tour) {
    return res.status(404).json({ status: 'Fail', message: 'Not Found' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

// Create new tour
exports.createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // Object.assign() method creates new object by merging two existing objects together
  const newTour = Object.assign({ id: newId }, req.body);
  console.log(newTour);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    // JSON.stringify converts javaScript object into string which is in JSON format
    JSON.stringify(tours),
    (err) => {
      //201 status code is for created
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

exports.updateTour = (req, res) => {
  // extract param from URL and then do parsing
  const params = req.params;
  const id = parseInt(params.id);

  // Find the specified tour and it's index in tours array
  let tourIndex;
  let tour;
  tours.forEach((el, index) => {
    if (el.id === id) {
      tour = el;
      tourIndex = index;
    }
  });

  // if tour not found return fail status
  if (!tour) {
    return res.status(404).json({ status: 'Fail', message: 'Not Found' });
  }

  // if tour is found then
  const tourToUpdate = req.body; // body of req is read
  // update each value
  for (const property in tourToUpdate) {
    tour[property] = tourToUpdate[property];
  }
  // assign the updated tour to tours array
  // NOTE: if we don't write the below code line ie. tours[tourIndex] = tour stil tour will be updated
  // because of shallow copy i.e changing the copy will change the original object also
  tours[tourIndex] = tour;

  // write update tours array into file tours-sample.json file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    // JSON.stringify converts javaScript object into string which is in JSON format
    JSON.stringify(tours),
    (err) => {
      console.log('Error:', err.message);
    }
  );
  //200 status code is for ok
  res.status(200).json({ status: 'success', message: 'updated' });
};

exports.deleteTour = (req, res) => {
  // extract param from URL and then do parsing
  const params = req.params;
  const id = parseInt(params.id);

  // Find the specified tour and it's index in tours array
  let tourIndex;
  let tour;
  tours.forEach((el, index) => {
    if (el.id === id) {
      tour = el;
      tourIndex = index;
    }
  });

  // removes one element at index (tourIndex) from tours array
  tours.splice(tourIndex, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    // JSON.stringify converts javaScript object into string which is in JSON format
    JSON.stringify(tours),
    (err) => {
      //201 status code is for created
      res.status(202).json({ status: 'success', message: 'deleted' });
    }
  );
};
