const { Yard } = require("../models");

const yardData = [
  {
    address: "123 Somewhere St",
    city: "Nowhereville",
    state: "CO",
    zip: 12345,
    user_id: 1,
  },
  {
    address: "88 Uptown Ave",
    city: "Nothere City",
    state: "CO",
    zip: 12345,
    user_id: 2,
  },
  {
    address: "4 S Parking Rd",
    city: "Smalltown",
    state: "CO",
    zip: 10001,
    user_id: 3,
  },
];

const seedYards = () => Yard.bulkCreate(yardData);

module.exports = seedYards;
