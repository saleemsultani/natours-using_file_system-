const mongoose = require('mongoose');
// dotenv module is used to connect config.env file to nodejs
const dotenv = require('dotenv');

// this command will read variables from config.env file and save them into nodejs environment variables
dotenv.config({ path: './config.env' });

const app = require('./app');

/////////////////////////////////////////////////////
// ******** Connecting to local database ********
// const LocalDB = process.env.DATABASE_LOCAL;
// mongoose
//   .connect(LocalDB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('LocalDB Connection Successfull!');
//   })
//   .catch((err) => {
//     console.log('Error:', err.message);
//   });

/////////////////////////////////////////////////////
// ******** Connecting to remote database ********

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successfull!');
  })
  .catch((err) => {
    console.log('Error:', err.message);
  });

// We are creating a schema using schema constructor by passing object to it
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// her we are creating a model out of the created schema
const Tour = mongoose.model('Tour', tourSchema);

/////////////////////////////////////////////////////////////////////

// Now we are creating an instance of the model
const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.7,
  price: 997,
});

// Here we are saving the tour to our database
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR : ', err);
//   });

//////////////////////////////////////////////////////////////////

// console.log(app.get('env'));
// console.log(process.env);

////////////////////////////////////////////////////

// we set port to what comes from environment variable or it will be 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
