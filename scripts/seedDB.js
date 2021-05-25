const mongoose = require("mongoose");
const db = require("../models");

// This file empties the User, Yard, Comment, and Appointment collections and inserts the data below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pupstop");

const userSeed = [
  {
    // id: "3",
    fname: "Gabe",
    lname: "Quakkelaar",
    email: "gabe.quakkelaar@gmail.com",
    password: "password12345",
  },
  {
    // id: "2",
    fname: "Justin",
    lname: "Westmoreland",
    email: "justinrwestmoreland@gmail.com",
    password: "password12345",
  },
  {
    // id: "1",
    fname: "Jenn",
    lname: "Greiner",
    email: "jenn.greiner1@gmail.com",
    password: "password12345",
  },
];

const yardSeed = [
  {
    name: "Sleepy Hollow",
    description: "A peaceful escape from the realities of everyday dogwalking",
    address: "123 Somewhere St",
    city: "Nowhereville",
    state: "CO",
    zip: 12345,
    fence: true,
    water: false,
    hasPets: true,
    rate: 20,
    user_id: 1,
  },
  {
    name: "La Vista Relaxation",
    description:
      "A sunny place off the main strip where you and yours can go to relax and recharge",
    address: "88 Uptown Ave",
    city: "Nothere City",
    state: "CO",
    zip: 12345,
    fence: false,
    water: true,
    hasPets: false,
    rate: 5,
    user_id: 2,
  },
  {
    name: "My backyard",
    description:
      "Not too big, but enough room for a few dogs to play comfortably",
    address: "4 S Parking Rd",
    city: "Smalltown",
    state: "CO",
    zip: 10001,
    fence: true,
    water: true,
    hasPets: true,
    rate: 17,
    user_id: 3,
  },
];

const commentSeed = [
  {
    body: "This is an incredible yard! The grass is green, the sun is shining, and the dogs had a great time!",
    date_created: "2021-03-22",
    user_id: "1",
    yard_id: "2",
  },
  {
    body: "Average yard, loud neighbor dogs, but having water available is great!",
    date_created: "2021-03-29",
    user_id: "1",
    yard_id: "3",
  },
  {
    body: "Lots of dead grass, clearly dogs dig a lot of holes here.",
    date_created: "2021-03-15",
    user_id: "3",
    yard_id: "1",
  },
  {
    body: "No shade or water makes this yard very hot for my fluffy pooch.",
    date_created: "2021-03-25",
    user_id: "2",
    yard_id: "1",
  },
];

const appointmentSeed = [
  {
    user_id: "1",
    yard_id: "3",
    datetime: "2021-05-12",
    num_pets: "2",
  },
  {
    user_id: "1",
    yard_id: "2",
    datetime: "2021-04-28",
    num_pets: "2",
  },
  {
    user_id: "2",
    yard_id: "1",
    datetime: "2021-04-18",
    num_pets: "1",
  },
  {
    user_id: "3",
    yard_id: "1",
    datetime: "2021-05-12",
    num_pets: "4",
  },
];

// Add seed users to the DB
db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Add seed yards to the DB
db.Yard.remove({})
  .then(() => db.Yard.collection.insertMany(yardSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Add seed comments to the DB
db.Comment.remove({})
  .then(() => db.Comment.collection.insertMany(commentSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Add seed appointments to the DB
db.Appointment.remove({})
  .then(() => db.Appointment.collection.insertMany(appointmentSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
