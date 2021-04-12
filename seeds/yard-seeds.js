const { Yard } = require("../models");

const yardData = [
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

const seedYards = () => Yard.bulkCreate(yardData);

module.exports = seedYards;
