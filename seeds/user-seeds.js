const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = [
  {
    fname: "Gabe",
    lname: "Quakkelaar",
    email: "gabe.quakkelaar@gmail.com",
    password: "password12345",
  },
  {
    fname: "Justin",
    lname: "Westmoreland",
    email: "justinrwestmoreland@gmail.com",
    password: "password12345",
  },
];

// const seedUsers = () => User.bulkCreate(userData);

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // process.exit(0);
};

module.exports = seedUsers;
